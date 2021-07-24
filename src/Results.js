import Pet from "./Pet"

const Results = ({ pets }) => {
	return (
		<div className={"search"}>
			{!pets.length ? (
				<h2>No Pats Found</h2>
			) : (
				pets.map((pet) => (
					<Pet
						animal={pet.animal}
						name={pet.name}
						breed={pet.breed}
						key={pet.id}
						location={`${pet.city}, ${pet.state}`}
						images={pet.images}
						id={pet.id}
					/>
				))
			)}
		</div>
	)
}

export default Results
