// Hiển thị dữ liệu
function apiGetConductUsers() {
  return axios({
    url: "https://62fa78c93c4f110faa9a02b9.mockapi.io/conductUsers",
    method: "GET",
  });
}
//   axios({
//     url: "https://62fa78c93c4f110faa9a02b9.mockapi.io/conductUsers",
//     method: "GET",
//   })
// Thêm thông tin
function apiAddUser(user) {
  return axios({
    url: "https://62fa78c93c4f110faa9a02b9.mockapi.io/conductUsers",
    method: "POST",
    data: user,
  });
}
// Xoá thông tin theo id
function apiDeleteUser(userId) {
  return axios({
    url: `https://62fa78c93c4f110faa9a02b9.mockapi.io/conductUsers/${userId}`,
    method: "DELETE",
  });
}

// Cập nhật thông tin
// lấy dữ liệu từ server xuống để fill thông tin
function apiGetUserById(userId) {
  return axios({
    url: `https://62fa78c93c4f110faa9a02b9.mockapi.io/conductUsers/${userId}`,
    method: "GET",
  });
}
// dữ liệu được cập nhật đưa lên server
function apiUpdateUser(userId, user) {
  return axios({
    url: `https://62fa78c93c4f110faa9a02b9.mockapi.io/conductUsers/${userId}`,
    method: "PUT",
    data: user,
  });
}
