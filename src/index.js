import Alpine from "alpinejs";
import casks from "./stores/casks";

import "./styles.css";

window.Alpine = Alpine;

Alpine.data("casks", casks);
Alpine.start();
