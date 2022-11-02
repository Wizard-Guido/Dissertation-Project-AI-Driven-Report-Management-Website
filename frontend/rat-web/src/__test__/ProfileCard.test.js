/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ProfileCard from '../components/ProfileCard';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const props = {
    userInfo: {
        last_name: "Koo",
        first_name: "William"
    }
};

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ProfileCard userInfo = {props.userInfo}/>, div);
});

it("renders button correctly", () => {
    const {getByTestId} = render(<ProfileCard userInfo = {props.userInfo}/>);
    expect(getByTestId("userName")).toHaveTextContent("William Koo");
});

it("matches snapshot", () => {
    const tree = renderer.create(<ProfileCard userInfo = {props.userInfo} />).toJSON();
    expect(tree).toMatchSnapshot();
});