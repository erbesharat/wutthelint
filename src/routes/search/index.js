import { h, Component } from 'preact';
import capitalize from 'capitalize-it';
import styled from 'styled-components';
import linters from '../../data/data';
import Linter from '../../components/linter/index';

const CategoryWrapper = styled.main`
	width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	flex-direction: column;
`;
export default class SearchRoute extends Component {
	state = {
		linters: null
	};

	getLinters(query) {
		const queryLinters = linters.filter(linter => {
			const name = linter.name;
			const creator = linter.creator;
			const description = linter.description;
			const category = linter.category;
			if (
				(name && name.includes(query)) ||
				(creator && creator.includes(query)) ||
				(description && description.includes(query)) ||
				(category && category.includes(query))
			) {
				return true;
			}

			return false;
		});

		this.setState({ linters: queryLinters });
	}

	// gets called when this route is navigated to
	componentDidMount() {
		this.getLinters(this.props.query);
	}

	// gets when props change
	componentWillReceiveProps() {
		this.getLinters(this.props.query);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ query }, { linters }) {
		return (
			<CategoryWrapper>
				<h1>
					Results for {capitalize(query)}:
				</h1>
				<ul>
					{linters && linters.map(linter => <Linter linter={linter} />)}
				</ul>
			</CategoryWrapper>
		);
	}
}
