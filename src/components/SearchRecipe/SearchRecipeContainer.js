import { connect } from "react-redux";
import SearchRecipe from "./SearchRecipe";

import { setIdRecipe } from "../../actions/recipes";

const mapStateToProps = (state) => ({
  idCurrent: state.recipe.id_current_recipe,
});

const mapDispatchToProps = (dispatch) => ({
  setIdCurrentRecipe: (id) => dispatch(setIdRecipe(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchRecipe);
