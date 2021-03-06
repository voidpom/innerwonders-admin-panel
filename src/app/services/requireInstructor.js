import React from 'react';
import firebase from './firebase';

export default function requireAdmin(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            
            firebase.auth().currentUser.getIdTokenResult().then(result => {
                if (!result.claims || result.claims.role !== "instructor") {
                    props.history.push('/videoUpload');
                }
            });
        }

        render() {
            return (
                <WrappedComponent />
            );
        }
    }
}