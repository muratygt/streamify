import React, { Component } from 'react';
import flv from 'flv.js';
import { fetchStream } from '../../actions/index';
import { connect } from 'react-redux';

class StreamShow extends Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
	}
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchStream(id);
		this.buildPlayer();
	}
	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}
	buildPlayer() {
		const { id } = this.props.match.params;
		if (this.player || !this.props.stream) {
			return;
		}
		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${id}.flv`
		});

		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}
	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		const { title, description } = this.props.stream;
		return (
			<div>
				<video ref={this.videoRef} stle={{ width: '100%' }} controls />
				<h1>{title}</h1>
				<h3>{description}</h3>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
