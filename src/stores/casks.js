const URL = "https://formulae.brew.sh/api/cask.json";

const getCaskList = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data.map((c) => {
    const { token, desc, name, homepage } = c;
    return {
      token,
      desc,
      name,
      homepage,
    };
  });
};

export default (initialState = []) => ({
  async init() {
    this.items = await getCaskList();
  },
  searchTerm: "",
  items: initialState,
  get filteredItems() {
    if (this.searchTerm.length === 0) return this.items;

    return this.items.filter((i) => {
      return i.token.startsWith(this.searchTerm);
    });
  },
});
