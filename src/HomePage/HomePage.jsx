import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Index from '../Articles/index.component'


import { userActions } from '../_actions';

 class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className=" col-md-offset-2 col-lg-8">
            <h3>Hi {user.firstName}!</h3>
       
            {users.loading && <em>Loading Articles...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            <h4>Other users</h4>
            {users.items &&
                <ul>
                    {users.items.filter(x=>x.username!==user.username).map((user, index) =>{
                       return <li key={user.id}>
                            {user.firstName + ' ' + user.lastName}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                            }
                        </li>}
                    )}
                </ul>
                
            }
    
            <Index/>
            <p>
                <Link to="/login">Logout</Link>
            </p>



            
        </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}
export {HomePage as HomePageForTest}
const home=  connect(mapState, actionCreators)(HomePage);
export {home as HomePage}
