interface IInvestmentsTabProps {
    show: boolean;
}

const InvestmentsTab = (props:IInvestmentsTabProps) => {
    return (
        <>
            {props.show && (
                <div>
                    Investments
                </div>
            )}
        </>
    )
}

export default InvestmentsTab;