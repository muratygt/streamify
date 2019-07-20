import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	renderContent() {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}
		return `Are you sure you want to delete this stream with the title: ${this.props.stream.title}`;
	}
	renderActions() {
		return (
			<React.Fragment>
				<button
					onClick={() => this.props.deleteStream(this.props.match.params.id)}
					className="ui button negative"
				>
					Delete
				</button>
				<button onClick={() => history.push('/')} className="ui button ">
					Cancel
				</button>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div>
				<Modal
					title="Delete Stream"
					content={this.renderContent()}
					actions={this.renderActions()}
					onDismiss={() => history.push('/')}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
