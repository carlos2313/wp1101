function Table(props){
    return(
        <table>
            <caption>{props.caption}</caption>
            <thead>
                <tr>
                    <th>Iteration</th> 
                    <th>Guessed Number</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {props.records.map((record, i) =>  
                <tr key={i.toString()}>
                    <td>{i+1}</td>
                    <td>{record.number}</td>
                    <td>{record.response.length > 4? "error": record.response}</td>
                </tr>
                )}
            </tbody>
        </table>
    )
}
export default Table;