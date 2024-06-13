/**
 * monthlyOutput(searchYear, searchMonth) : 당월 이용자의 지출 내역
 * monthlyInput(searchYeaar, searchMonth) : 당월 이용자의 소득 내역
 */

import { useBudgetStore } from '@/stores/budgetStore.js'  

let curDate = new Date();
const curYear = Number(curDate.getFullYear());
const curMonth = Number(curDate.getMonth())+1;


const monthlyOutput = function(searchYear = curYear, searchMonth = curMonth) {
    let outcome = 0;
    const budgetStore = useBudgetStore();
    
    for (const transaction of budgetStore.transactions) {
        const date = transaction.date.split("-")
        const year = Number(date[0]);
        const month = Number(date[1]);
        console.log(transaction.type)
        if (transaction.type == "출금"){
            console.log("출금 호출")
            if ((year == searchYear) && (month == searchMonth)) {
               
                outcome = outcome + Number(transaction.amount);
                console.log("누적지출 = " + outcome);
            }
        }
    }
    return Intl.NumberFormat('ko-KR').format(outcome);
}

const monthlyInput = function(searchYear = curYear, searchMonth = curMonth) {
    let income = 0;
    const budgetStore = useBudgetStore();
    
    for (const transaction of budgetStore.transactions) {
        const date = transaction.date.split("-")
        const year = Number(date[0]);
        const month = Number(date[1]);
        console.log(transaction.type)
        if (transaction.type == "입금"){
            if ((year == searchYear) && (month == searchMonth)) {
               
                income = income + Number(transaction.amount);
                console.log("누적지출 = " + income);
            }
        }
    }

    //console.log("총 지출 : " + outcome);
    //return new Intl.NumberFormat('ko-KR').format(outcome);
    return Intl.NumberFormat('ko-KR').format(income);
}

export {monthlyOutput, monthlyInput};