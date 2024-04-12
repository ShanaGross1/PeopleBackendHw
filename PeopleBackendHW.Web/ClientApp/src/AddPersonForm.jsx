
export default function AddPersonForm({ person, onInputChange, onAddClick, isEdit, onUpdateClick, onCancelClick }) {
    const { firstName, lastName, age } = person;

    return <div className="row p-5 rounded" style={{ backgroundColor: 'lightblue' }}>
        <div className="col-md-3">
            <input value={firstName} onChange={onInputChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3">
            <input value={lastName} onChange={onInputChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3">
            <input value={age} onChange={onInputChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>

        {isEdit ? <>
            <div className="col-md-3">
                <button onClick={onUpdateClick} className='btn btn-primary w-100'>Update</button>
            </div>
            <div className="col-md-3">
                <button onClick={onCancelClick} className='btn btn-primary w-100'>Cancel</button>
            </div>
        </>
            :
            <div className="col-md-3">
                <button onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
            </div>
        }
    </div>
}