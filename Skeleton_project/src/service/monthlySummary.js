import { useBudgetStore } from '@/stores/budgetStore.js'  


let income;

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
        //console.log(transaction.type)
        //console.log("총지출 : " + outcome)

        if (transaction.type == '출금'){
            if ((year == searchYear) && (month == searchMonth)) {
               
                outcome = outcome + Number(transaction.amount);
                //console.log("누적지출 = " + outcome);
            }
        }
    }

    //console.log("총 지출 : " + outcome);
    //return new Intl.NumberFormat('ko-KR').format(outcome);
    return Intl.NumberFormat('ko-KR').format(outcome);
}

export {monthlyOutput};