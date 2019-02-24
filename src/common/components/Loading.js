/*
	by Jpanter
	https://codepen.io/jpanter/

	Granted permission to Destiny.report to use the code
*/

import React, { Component } from "react";
import "../styles/components/Loading.scss";

class Loading extends Component {
	id = 0;
	current = 0;
	timeoutId = 0;
	state = {
		guardians: ["warlock", "titan", "hunter"],
		guardian: ""
	};

	componentDidMount() {
		this.timeoutId = setTimeout(() => {
			this.updateClass();
		}, 100);

		this.id = setInterval(this.updateClass, 2100);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
		clearInterval(this.id);
	}

	updateClass = () => {
		const { guardians } = this.state;
		this.setState({ guardian: guardians[this.current] }, () => {
			if (this.current === 2) {
				this.current = 0;
			} else {
				this.current++;
			}
		});
	};
	render() {
		const { guardian } = this.state;

		return (
			<div className="loading--wrapper">
				<div className={`the-cade-6-unit-dank-af-anmation ${guardian}`}>
					<span className="circle circle--1" />
					<span className="circle circle--2" />
					<span className="circle circle--3" />
					<span className="circle circle--4" />
					<div className="line-group line-group--1">
						<span className="line line--1" />
						<span className="line line--2" />
						<span className="line line--3" />
						<span className="line line--4" />
					</div>
					<div className="line-group line-group--2">
						<span className="line line--1" />
						<span className="line line--2" />
						<span className="line line--3" />
						<span className="line line--4" />
					</div>
					<div className="line-group line-group--3">
						<span className="line line--1" />
						<span className="line line--2" />
						<span className="line line--3" />
						<span className="line line--4" />
					</div>
					<div className="shape-group">
						<span className="shape shape--1" />
						<span className="shape shape--2" />
						<span className="shape shape--3" />
						<span className="shape shape--4" />
					</div>
				</div>
			</div>
		);
	}
}

export default Loading;
