import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardImg,
} from "reactstrap";

import "./SearchRecipe.css";
import getComplexRecipe from "../../api/getComplexRecipe";

class SearcRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCatalog: [],
      searchWord: "",
      diet: "all",
      type: "all",
      maxFat: "",
    };
    this.onHandleChangeSearchRecipe = this.onHandleChangeSearchRecipe.bind(
      this
    );
    this.onHandleChangeDiet = this.onHandleChangeDiet.bind(this);
    this.onHandleChangeType = this.onHandleChangeType.bind(this);
    this.onHandleChangeMaxFat = this.onHandleChangeMaxFat.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.handleSetIdCurrentRecipe = this.handleSetIdCurrentRecipe.bind(this);
  }

  componentDidMount() {
    // Initialize favorites recipe array in localstorage
    if (localStorage.getItem("FavoritesRecipes") == null) {
      localStorage.setItem("FavoritesRecipes", JSON.stringify([]));
    }
    // Save informations preview recipe searching if exist
    const lastSearchRecipe = JSON.parse(localStorage.getItem("searchRecipe"));
    const lastSearchDiet = localStorage.getItem("searchDiet");
    const lastSearchType = localStorage.getItem("searchType");
    const lastSearchMaxFat = localStorage.getItem("searchmaxFat");

    if (lastSearchRecipe != null) {
      this.setState({ dataCatalog: lastSearchRecipe });
    }

    if (lastSearchDiet != null) {
      this.setState({ diet: lastSearchDiet });
    }

    if (lastSearchType != null) {
      this.setState({ type: lastSearchType });
    }

    if (lastSearchMaxFat != null) {
      this.setState({ maxFat: lastSearchMaxFat });
    }
  }

  onHandleChangeSearchRecipe(e) {
    this.setState({ searchWord: e.target.value });
  }

  onHandleChangeDiet(e) {
    this.setState({ diet: e.target.value });
  }

  onHandleChangeType(e) {
    this.setState({ type: e.target.value });
  }

  onHandleChangeMaxFat(e) {
    this.setState({ maxFat: e.target.value });
  }

  async onSubmit() {
    const { searchWord, diet, type, maxFat } = this.state;
    const resultSearchRecette = await getComplexRecipe(
      searchWord,
      diet,
      type,
      maxFat
    );

    this.setState({ dataCatalog: resultSearchRecette });

    localStorage.setItem("searchRecipe", JSON.stringify(resultSearchRecette));
    localStorage.setItem("searchDiet", diet);
    localStorage.setItem("searchType", type);
    localStorage.setItem("searchmaxFat", maxFat);
  }

  handleSetIdCurrentRecipe = (e) => {
    const { setIdCurrentRecipe } = this.props;
    setIdCurrentRecipe(e.target.alt);
  };

  render() {
    const { dataCatalog } = this.state;
    return (
      <div>
        <Form>
          <FormGroup>
            <div id="searchRecipe">
              <label for="type"> Recipe : </label>
              <Input
                type="text"
                id="searchRecipeInput"
                placeholder="Pizza, chocolat, pancake ..."
                onChange={this.onHandleChangeSearchRecipe}
              />
            </div>
            <label for="diets">Choose a diet : </label>
            <select id="diets" name="diets" onChange={this.onHandleChangeDiet}>
              <option value="All">All</option>
              <option value="glutenFree">Gluten Free</option>
              <option value="vetogenic">Vetogenic</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="lacto-Vegetarian">Lacto-Vegetarian</option>
              <option value="ovo-Vegetarian">Ovo-Vegetarian</option>
              <option value="lacto-Vegetarian">Lacto-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="pescetarian">Pescetarian</option>
            </select>
            <br />
            <label for="type">Choose a type of meals : </label>
            <select id="types" name="types" onChange={this.onHandleChangeType}>
              <option value="all">All</option>
              <option value="breakfast">Breakfast</option>
              <option value="dessert">Dessert</option>
              <option value="drink">Drink</option>
              <option value="snack">Snack</option>
              <option value="sauce">Sauce</option>
              <option value="soupe">Soupe</option>
              <option value="salad">Salad</option>
              <option value="pescetarian">Pescetarian</option>
            </select>
            <br />
            <label for="type"> Max fat : </label>
            <Input
              type="number"
              id="maxFatInput"
              min="0"
              placeholder="100"
              onChange={this.onHandleChangeMaxFat}
            />
          </FormGroup>

          <Button id="buttonSearch" color="info" onClick={this.onSubmit}>
            Search
          </Button>
        </Form>

        {dataCatalog.map((recipe) => (
          <Card className="catalogueRecipe">
            <Link to={"/informationsRecipe/" + recipe.id}>
              <CardImg
                top
                src={recipe.image}
                alt={recipe.id}
                onClick={this.handleSetIdCurrentRecipe}
              />
            </Link>
            <CardBody>
              <CardTitle>{recipe.title}</CardTitle>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
}

SearcRecipe.propTypes = {
  idCurrent: PropTypes.number.isRequired,
  setIdCurrentRecipe: PropTypes.func.isRequired,
};

export default SearcRecipe;
