// src/ra-trailbase.js
// Simple dataProvider + authProvider for react-admin to use with Trailbase.
// EDIT: set TRAILBASE_API_URL to your Trailbase base API URL (no trailing slash)
const TRAILBASE_API_URL = "https://miniature-palm-tree-q79gwj549944f4rv6-4000.app.github.dev/_/admin/table/;"  // <-- CHANGE THIS to your Trailbase URL

// helper: build URL with query params
const buildUrl = (resource, params = {}) => {
  const url = new URL(`${TRAILBASE_API_URL}/${resource}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    url.searchParams.append(k, v);
  });
  return url.toString();
};

// adapt to Trailbase pagination/sorting if needed
const buildQuery = (resource, params) => {
  // react-admin sends pagination and sort info in params
  // We convert to a simple page/per_page or _page/_limit style.
  const { pagination = {}, sort = {} } = params;
  const { page = 1, perPage = 10 } = pagination;
  const { field, order } = sort;
  // Default will send _page and _limit (JSON Server style).
  // If Trailbase uses different names, change _page/_limit to page/limit or offset/limit.
  return {
    _page: page,
    _limit: perPage,
    _sort: field,
    _order: order,
    // other params (filters) will be appended by caller
  };
};

const jsonHeaders = {
  "Content-Type": "application/json",
};

const removeUndefined = (obj) => Object.fromEntries(Object.entries(obj).filter(([,v]) => v !== undefined && v !== null));

// dataProvider
const dataProvider = {
  getList: async (resource, params) => {
    // params: { pagination: { page, perPage }, sort: { field, order }, filter: {} }
    const query = buildQuery(resource, params);
    // append filter params
    const filters = params.filter || {};
    const merged = { ...query, ...removeUndefined(filters) };
    const url = buildUrl(resource, merged);
    const res = await fetch(url, {
      headers: { Accept: "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    // If Trailbase returns { data: [...], total: n } then adjust below.
    // This code assumes endpoint returns an array and uses header X-Total-Count for total (json-server style).
    const totalHeader = res.headers.get("X-Total-Count");
    const total = totalHeader ? parseInt(totalHeader, 10) : Array.isArray(data) ? data.length : (data.total || 0);

    // react-admin expects each record to have 'id' field
    const records = Array.isArray(data) ? data.map(mapId) : (data.data || []);
    return { data: records, total };
  },

  getOne: async (resource, { id }) => {
    const url = `${TRAILBASE_API_URL}/${resource}/${id}`;
    const res = await fetch(url, { headers: { Accept: "application/json" }});
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return { data: mapId(data) };
  },

  create: async (resource, { data }) => {
    const url = `${TRAILBASE_API_URL}/${resource}`;
    const res = await fetch(url, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Create failed ${res.status}: ${txt}`);
    }
    const ret = await res.json();
    return { data: mapId(ret) };
  },

  update: async (resource, { id, data }) => {
    const url = `${TRAILBASE_API_URL}/${resource}/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: jsonHeaders,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Update failed ${res.status}`);
    const ret = await res.json();
    return { data: mapId(ret) };
  },

  delete: async (resource, { id }) => {
    const url = `${TRAILBASE_API_URL}/${resource}/${id}`;
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed ${res.status}`);
    const ret = await res.json().catch(() => ({}));
    return { data: mapId(ret) };
  },

  // Optional - useful for some react-admin features:
  getMany: async (resource, { ids }) => {
    // naive approach: call getOne for each id (ok for small sets)
    const promises = ids.map((id) => fetch(`${TRAILBASE_API_URL}/${resource}/${id}`).then(r => r.json()));
    const results = await Promise.all(promises);
    return { data: results.map(mapId) };
  }
};

// helper: ensure each record has 'id' property (map other PK to id)
function mapId(record) {
  if (!record) return record;
  if (record.id) return record;
  if (record._id) return { ...record, id: record._id };
  // if Trailbase uses 'book_id' or similar, set here:
  if (record.book_id) return { ...record, id: record.book_id };
  return { ...record };
}

// simple authProvider: stores token in localStorage under "trail_token"
// If your Trailbase setup does not require auth, you can leave login to accept anything.
const authProvider = {
  login: async ({ username, password }) => {
    // Modify this function if your Trailbase exposes a login endpoint that returns a token.
    // Example (uncomment and adapt):
    // const res = await fetch(`${TRAILBASE_API_URL}/auth/login`, {
    //   method: "POST",
    //   headers: jsonHeaders,
    //   body: JSON.stringify({ username, password })
    // });
    // const payload = await res.json();
    // localStorage.setItem("trail_token", payload.token);

    // Default: accept any credentials and set a placeholder token (useful if Trailbase allows anonymous).
    localStorage.setItem("trail_token", "anon-token");
    return Promise.resolve();
  },

  logout: async () => {
    localStorage.removeItem("trail_token");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("trail_token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("trail_token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve()
};

export default dataProvider;
export { authProvider };
