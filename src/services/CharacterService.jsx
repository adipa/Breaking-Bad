import http from "../http-common";

class CharacterService {
  getList(page) {
    const offset = (page - 1) * 10;
    return http.get("?limit=10&offset=" + offset);
  }

  get(id) {
    return http.get(`${id}`);
  }

  getByName(name) {
    return http.get("?name=" + name);
  }

  getByCategory(category) {
    console.log(category);
    return http.get("?category=" + category);
  }
}

export default new CharacterService();
