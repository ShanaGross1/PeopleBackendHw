export default function PersonRow({ person, onEditClick, onDeleteClick, onSelectClick, isSelected }) {
    const { firstName, lastName, age } = person;

    return (<tr>
        <td>
            <input className="form-check-input"
                style={{ transform: "scale(1.5)", textAlign: "center" }}
                type="checkbox"
                onChange={onSelectClick}
                checked={isSelected} />
        </td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>
            <button onClick={onEditClick}>Edit</button>
            <button onClick={onDeleteClick}>Delete</button>
        </td>
    </tr>)
}


