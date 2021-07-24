import { Link } from "react-router-dom"

const Pet = ({ name, animal, breed, location, images, id }) => {
	let hero = "http://pets-images.dev-appis.com/pets/none.jpg"
	if (images.length) {
		hero = images[0]
	}
	return (
		<Link className={"pet"} to={`/details/${id}`}>
			<div className={"image-container"}>
				<img alt={name} src={hero} />
			</div>
			<div className={"info"}>
				<h1>{name}</h1>
				<h2>{`${animal} - ${breed} - ${location}`}</h2>
			</div>
		</Link>
	)
}

export default Pet
