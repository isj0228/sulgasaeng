import { useBudgetStore } from '@/stores/budgetStore.js'  


let income;
let outcome = 0;

let curDate = new Date();
const curYear = Number(curDate.getFullYear());
const curMonth = Number(curDate.getMonth());

const monthlyOutput = function(searchYear = curYear, searchMonth = curMonth) {

    console.log("curYear = " + curYear)
    console.log("curMonth = " + curMonth);
    console.log("curMonth.type = "+ typeof curYear)
    console.log(outcome);

    const budgetStore = useBudgetStore();
    
    for (const transaction of budgetStore.transactions) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        const date = transaction.date.split("-")
        const year = Number(date[0]);
        const month = Number(date[1]);

        console.log("---Year = " + year)
        console.log("---Month = " + month);
        console.log("year == curYear ? "+ (year == curYear))
        console.log("month == curMonth ?" + (month == curMonth))
        console.log("outcome : " + transaction.amount);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2
        if (transaction.type === 'outcome'){
            console.log("outcome correct!")
            if (year == searchYear && month == searchMonth) {
                console.log("일치!")
                outcome = outcome + Number(transaction.amount);
                console.log("&&&&");
                console.log("outcome = " + outcome);
            }
        }
    }

    //console.log(outcome);
}

export {monthlyOutput};