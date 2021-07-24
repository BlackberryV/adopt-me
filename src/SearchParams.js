import { useState, useEffect, useContext } from "react"
import useBreedList from "./useBreedList"
import ContextTheme from "./ContextTheme"
import Results from "./Results"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
	const [location, setLocation] = useState("Seattle, WA")
	const [animal, setAnimal] = useState("")
	const [breed, setBreed] = useState("")
	const [pets, setPets] = useState([])
	const [breeds] = useBreedList(animal)
	const [theme, setTheme] = useContext(ContextTheme)

	useEffect(() => {
		requestPets()
	}, []) //eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		const res = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
		)
		const json = await res.json()

		console.log(json)
		setPets(json.pets)
	}

	return (
		<div className={"search-params"}>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					requestPets()
				}}
			>
				<label htmlFor={"location"}>
					Location
					<input
						id={"location"}
						onChange={(event) => setLocation(event.target.value)}
						value={location}
						placeholder={"location"}
					/>
				</label>
				<label htmlFor={"animal"}>
					Animal
					<select
						id={"animal"}
						value={animal}
						onBlur={(event) => setAnimal(event.target.value)}
						onChange={(event) => setAnimal(event.target.value)}
					>
						<option />
						{ANIMALS.map((animal) => (
							<option value={animal} key={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>
				<label htmlFor={"breed"}>
					Breed
					<select
						id={"breed"}
						value={breed}
						onBlur={(event) => setBreed(event.target.value)}
						onChange={(event) => setBreed(event.target.value)}
					>
						<option />
						{breeds.map((breed) => (
							<option value={breed} key={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>
				<label htmlFor={"theme"}>
					Theme
					<select
						value={theme}
						onChange={(event) => {
							setTheme(event.target.value)
						}}
						onBlur={(event) => {
							setTheme(event.target.value)
						}}
					>
						<option value={"darkblue"}>Dark Blue</option>
						<option value={"peru"}>Peru</option>
						<option value={"chartreuse"}>Chartreuse</option>
						<option value={"mediumorchid"}>Mediumorchid</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	)
}

export default SearchParams
