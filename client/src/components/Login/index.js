import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import FormGroup from '../Forms/FormGroup';
import StyledButton from '../Forms/Button.styled';
import { Subtitle } from '../Forms/Forms.styled';

class Login extends Component {
	static propTypes = {
		loginUser: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
		errors: PropTypes.object.isRequired,
	};

	state = {
		email: '',
		password: '',
		errors: {},
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/hearted');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		const newUser = {
			email,
			password,
		};
		this.props.loginUser(newUser, this.props.history);
	};

	render() {
		const { email, password, errors } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<Subtitle>
					<h1>Login</h1>
					<Link to="/register">Not registered?</Link>
				</Subtitle>
				<FormGroup
					name="email"
					prettyName="Email"
					value={email}
					onChange={this.handleChange}
					errors={errors}
				/>
				<FormGroup
					name="password"
					prettyName="Password"
					value={password}
					type="password"
					onChange={this.handleChange}
					errors={errors}
				/>
				<StyledButton type="submit">Submit</StyledButton>
			</form>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(withRouter(Login));
