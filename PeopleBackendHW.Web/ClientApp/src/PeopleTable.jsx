import React from 'react';
import AddPersonForm from './AddPersonForm';
import axios from 'axios';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {

    state = {
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        selectedIds: [],
        isEdit: false
    }

    componentDidMount = () => {
        this.loadPeople();
    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(response => {
            this.setState({ people: response.data });
        });
    }

    onAddClick = () => {
        const { firstName, lastName, age } = this.state.person;
        axios.post('/api/people/add', { firstName: firstName, lastName: lastName, age: age }).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                },
            })
        });
    }

    onDeleteManyClick = () => {
        axios.post('api/people/deletemany', { ids: this.state.selectedIds }).then(response => {
            this.loadPeople();
        })
    }

    onDeleteClick = (id) => {
        axios.post('api/people/delete', { Id: id }).then(response => {
            this.loadPeople();
        })
    }

    onInputChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onSelectClick = (id) => {
        const { selectedIds } = this.state;

        let idsSelected = selectedIds.includes(id) ? [...selectedIds.filter(i => i !== id)] : [...selectedIds, id];
        this.setState({ selectedIds: idsSelected });
    }

    onEditClick = (p) => {
        this.setState({ person: { firstName: p.firstName, lastName: p.lastName, age: p.age, id: p.id }, isEdit: true })
        this.loadPeople()
    }

    onSelectAll = () => {
        this.setState({ selectedIds: [...this.state.people.map(p => p.id)] })
    }

    onUncheckAll = () => {
        this.setState({ selectedIds: [] })
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    id: ''
                },
            })
        });
    }

    getTableHead = () => {
        return (
            <thead>
                <tr >
                    <td>
                        <button onClick={this.onDeleteManyClick} className="btn btn-danger">Delete Selected</button>
                        <br />
                        <button onClick={this.onUncheckAll} className="btn btn-primary">Uncheck all</button>
                        <br />
                        <button onClick={this.onSelectAll} className="btn btn-info">Select all</button>
                    </td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Age</td>
                    <td></td>
                </tr>
            </thead>)

    }

    onCancelClick = () => {
        this.setState({ person: { firstName: '', lastName: '', age: '' }, isEdit: false })
    }
    render() {
        const { person, people, selectedIds, isEdit } = this.state;
        return (
            <>
                <AddPersonForm people={people}
                    person={person}
                    onInputChange={this.onInputChange}
                    onAddClick={this.onAddClick}
                    isEdit={isEdit}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />

                <div className='row'>
                    <table className='table table-hover table-striped table-bordered mt-3'>

                        {this.getTableHead()}

                        <tbody>
                            {people.map(p => <PersonRow
                                person={p}
                                isSelected={selectedIds.includes(p.id)}
                                key={p.id}
                                onSelectClick={() => this.onSelectClick(p.id)}
                                onDeleteClick={() => this.onDeleteClick(p.id)}
                                onEditClick={() => this.onEditClick(p)}
                            />)}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default PeopleTable;
