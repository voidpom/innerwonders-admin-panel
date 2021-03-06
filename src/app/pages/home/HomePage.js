import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Users from './users';
import VideoUpload from './videoUpload';
import InstructorVideoUpload from './instructorVideoUpload';
import IntroVideoUpload from './introVideoUpload';
import PodCast from './podCast';
import { LayoutSplashScreen } from "../../../_metronic";

import CustomSnackbar from './serviceComponents/CustomSnackbar';
import CustomConfirm from './serviceComponents/CustomConfirm';

import requireAdmin from '../../services/requireAdmin';
import requireInstructor from '../../services/requireInstructor';

import { firebase, instance } from '../../services';


export default class extends React.Component {
    constructor(props) {
        super(props);
        if (firebase.auth().currentUser) {
            firebase.auth().currentUser.getIdToken().then((token) => {
                instance.defaults.headers.common['authorization'] = "Bearer " + token;
            });
        }
    }
    render() {
        return (
            <Suspense fallback={<LayoutSplashScreen />}>
                <Switch>
                    {
                        <Redirect exact from="/" to="/videoUpload" />
                    }
                    <Route path="/users" component={requireAdmin(Users)} />
                    <Route path="/videoUpload" component={requireAdmin(VideoUpload)} />
                    <Route path="/instructorVideoUpload" component={requireInstructor(InstructorVideoUpload)} />
                    <Route path="/introVideoUpload" component={requireAdmin(IntroVideoUpload)} />
                    <Route path="/podcast" component={requireAdmin(PodCast)} />
                    <Redirect to="/videoUpload" />
                </Switch>
                
                <CustomSnackbar />
                <CustomConfirm />
            </Suspense>
        );
    }
}