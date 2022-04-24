import moment from 'moment';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from "../../hooks/use-local-storage.hook";
import { AutoCategorySelectors } from '../../store/auto-category/auto-category.selectors';
import { CategorySelectors } from '../../store/category/category.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { createDate, endOfNextMonth, formatDateFull, today, withinThreeDays } from "../../utils/date.utils";

const effectiveMonthlyInterestRate = (interestRate: number) => {
  const rate = Math.pow(Math.pow((1 + interestRate / 100 / 2), 2), 1/12) - 1;
  return rate;
};

const startingBalanceLs = 'mortgage_startingBalanceLs';
const interestRateLs = 'mortgage_interestRateLs';
const paymentAmountLs = 'mortgage_paymentAmountLs';

export const useMortgage = () => {
  const [lsStartingBalance, setLsStartingBalance] = useLocalStorage(startingBalanceLs, 0);
  const [lsInterestRate, setLsInterestRate] = useLocalStorage(interestRateLs, 0);
  const [lsPaymentAmount, setLsPaymentAmount] = useLocalStorage(paymentAmountLs, 0);

  const [startingBalance, setStartingBalance] = React.useState(lsStartingBalance || 0);
  const [interestRate, setInterestRate] = React.useState(lsInterestRate || 0);
  const [paymentAmount, setPaymentAmount] = React.useState(lsPaymentAmount || 0);
  const [payments, setPayments] = React.useState([]);

  const handleStartingBalance = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => 
    {
      try {
        const parsedValue = parseFloat(evt.currentTarget.value);
        if (parsedValue !== NaN) {
          setStartingBalance(parsedValue);
          setLsStartingBalance(parsedValue);
        }
      } catch {}
    }, []);
  const handleInterestRate = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const parsedValue = parseFloat(evt.currentTarget.value);
      if (parsedValue !== NaN) {
      setInterestRate(parsedValue);
      setLsInterestRate(parsedValue);
      }
    } catch {}
  }, []);
  const handlePaymentAmount = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const parsedValue = parseFloat(evt.currentTarget.value);
      if (parsedValue !== NaN) {
      setPaymentAmount(parsedValue);
      setLsPaymentAmount(parsedValue);
      }
    } catch {}
  }, []);

  
  const allRecords = useSelector(RecordSelectors.selectAllRecordsAcrossAccounts);
  const category = useSelector(CategorySelectors.selectCategories).find(c => c.name === 'Rent/Mortgage');
  const autoCategories = useSelector(AutoCategorySelectors.autoCategories);

  const recordsThatMatchCategory = React.useMemo(() => {
    const mappedAutoCategories = Object.keys(autoCategories)
      .map(id => autoCategories[id])
      .reduce((prev, curr) => {
        return [...curr, ...prev];
      }, [])
      .filter(c => c.categoryId === category.id)
      .map(c => c.id);
  
    return allRecords
      .filter(r => r.categoryId === category.id || mappedAutoCategories.indexOf(r.autoCategoryId) >= 0)
      .map(r => {
        return {
          ...r,
          date: createDate(r.date)
        };
      });
  }, [allRecords, category, autoCategories]);
  

  const years = 25;
  const paymentsPerYear = 12;
  const firstPaymentDate = createDate('2021-08-30');
  const effectiveRate = effectiveMonthlyInterestRate(interestRate);

  const calculatePayments = React.useCallback(() => {
    const compareDate = createDate(today());
    const iterations = years * paymentsPerYear;
    let runningBalance = startingBalance;
    let runningDate = firstPaymentDate;

    const rows = [];
    for (let i = 0; i < iterations; i++) {
      const interest = parseFloat((runningBalance * effectiveRate).toFixed(2));
      const principal = paymentAmount - interest;
      const balance = runningBalance - principal;

      // Don't return more rows if we are done paying the mortgage...
      if (balance < 0) {
        break;
      }


      const matchingRecord = recordsThatMatchCategory.find(r => withinThreeDays(r.date, runningDate));

      console.log('Matching record?', matchingRecord);

      const row = {
        id: i,
        date: runningDate,
        paymentNumber: i + 1,
        interest,
        principal,
        balance,
        pastDate: runningDate < compareDate,
        associatedRecord: matchingRecord 
          // TODO include account name paid from?
          ? `${formatDateFull(matchingRecord.date as moment.Moment)} - ${matchingRecord.description}` 
          : null
      };
      rows.push(row);

      runningBalance = balance;
      runningDate = endOfNextMonth(runningDate);
    }

    setPayments(rows);
  }, [startingBalance, paymentAmount, effectiveRate, firstPaymentDate, years, paymentsPerYear, recordsThatMatchCategory]);


  return {
    handleInterestRate, 
    handlePaymentAmount,
    handleStartingBalance,
    startingBalance,
    interestRate,
    paymentAmount,
    payments,
    calculatePayments
  };
};