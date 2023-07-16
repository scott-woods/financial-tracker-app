interface IExpensesTabProps {
    show: boolean;
}

const ExpensesTab = (props:IExpensesTabProps) => {
    return (
        <>
            {props.show && (
                <div>
                    Expenses
                </div>
            )}
        </>
    )
}

export default ExpensesTab;