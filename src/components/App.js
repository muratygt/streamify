import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import StreamEdit from '../components/streams/StreamEdit';
import StreamShow from '../components/streams/StreamShow';
import StreamDelete from '../components/streams/StreamDelete';
import StreamCreate from '../components/streams/StreamCreate';
import StreamList from '../components/streams/StreamList';
import Header from './Header';

const App = () => {
	return (
		<div className="ui container">
			<BrowserRouter>
				<div>
					<Header />
					<Route path="/" exact component={StreamList} />
					<Route path="/streams/new" component={StreamCreate} />
					<Route path="/streams/edit" component={StreamEdit} />
					<Route path="/streams/delete" component={StreamDelete} />
					<Route path="/streams/show" component={StreamShow} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;
