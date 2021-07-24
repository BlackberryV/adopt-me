import { Component } from "react"
import { withRouter } from "react-router-dom"
import Carousel from "./Carousel"
import ErrorBoundary from "./ErrorBoundary"
import ContextTheme from "./ContextTheme"
import Modal from "./Modal"

class Details extends Component {
	state = { loading: true, showModal: false }

	async componentDidMount() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
		)
		const json = await res.json()
		this.setState(
			Object.assign(
				{
					loading: false,
				},
				json.pets[0]
			)
		)
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal })
	}

	adopt = () => (window.location = "http://bit.ly/pet-adopt")

	render() {
		const {
			animal,
			breed,
			city,
			state,
			name,
			description,
			images,
			showModal,
		} = this.state
		if (this.state.loading) {
			return <h2>loading...</h2>
		}
		return (
			<div className={"details"}>
				<Carousel images={images} />
				<h1>{name}</h1>
				<h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
				<ContextTheme.Consumer>
					{([theme]) => (
						<button
							style={{ backgroundColor: theme }}
							onClick={this.toggleModal}
						>
							Adopt {name}
						</button>
					)}
				</ContextTheme.Consumer>
				<p>{description}</p>
				{showModal ? (
					<Modal>
						<div>
							<h2>Would you like to adopt {name}?</h2>
							<div className={"buttons"}>
								<button onClick={this.adopt}>Yes</button>
								<button onClick={this.toggleModal}>No</button>
							</div>
						</div>
					</Modal>
				) : null}
			</div>
		)
	}
}

const DetailsWithRouter = withRouter(Details)
export default function DetailsWithErrorBoundary() {
	return (
		<ErrorBoundary>
			<DetailsWithRouter />
		</ErrorBoundary>
	)
}
