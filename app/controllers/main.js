function dom(selector) {
  return document.querySelector(selector);
}
getConductUsers();
let users = [];
//==========================VALIDATE==================================
//  Tài Khoản (username): không được để trống.value không được trùng
function validateUserName() {
  let userName = dom("#TaiKhoan").value;
  let spanEl = dom("#spanTaiKhoan");
  if (!userName) {
    spanEl.innerHTML = "Không để trống tài khoản";
    return false;
  }
  const find = users.find((user) => {
    return user.userName === userName;
  });
  console.log(users, userName);
  if (find) {
    spanEl.innerHTML = "Tài khoản đã có vui lòng nhập tài khoản khác";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
// Họ tên: không được để trống, không chứa số và ký tự đặc biệt
function validateName() {
  let name = dom("#HoTen").value;
  let spanEl = dom("#spanHoTen");
  if (!name) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }
  function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }
  let re = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/g;
  if (!re.test(removeAscent(name))) {
    spanEl.innerHTML = "Tên nhân viên chỉ chứa chữ";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
// Mật khẩu: không được để trống, dúng format (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số, độ dài 6-8)
function validatePassword() {
  let password = dom("#MatKhau").value;
  let spanEl = dom("#spanMatKhau");
  if (!password) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }
  if (password.length > 8) {
    spanEl.innerHTML = "password từ 6 đến 8 ký tự";
    return false;
  }
  let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    spanEl.innerHTML =
      "password có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
// Email: không được để trống, đúng format email
function validateEmail() {
  let email = dom("#Email").value;
  let spanEl = dom("#spanEmail");
  if (!email) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }
  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)) {
    spanEl.innerHTML = "email không đúng định dạng";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
// Hinh ảnh: không được để trống
function validateImage() {
  let image = dom("#HinhAnh").value;
  let spanEl = dom("#spanHinhAnh");
  if (!image) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
// Loại người dùng: phải chọn
function validateTypeUser() {
  let typeUser = dom("#loaiNguoiDung").value;
  let spanEl = dom("#spanUser");
  if (typeUser === "Chọn loại người dùng") {
    spanEl.innerHTML = "Phải chọn loại người dùng";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
// Loại ngôn ngữ: phải chọn
function validateTypeLanguage() {
  let typeLanguage = dom("#loaiNgonNgu").value;
  let spanEl = dom("#spanLanguage");
  if (typeLanguage === "Chọn ngôn ngữ") {
    spanEl.innerHTML = "Phải chọn loại ngôn ngữ";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
// Mô tả: không được để trống, không vượt quá 60 ký tự
function validateDescription() {
  let description = dom("#MoTa").value;
  let spanEl = dom("#spanDescription");
  if (!description) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }
  if (description.length > 60) {
    spanEl.innerHTML = "Mô tả dưới 60 ký tự";
    return false;
  }
  spanEl.innerHTML = "";
  return true;
}
function validateForm(type) {
  let isValid = true;
  if (type === "edit") {
    isValid =
      validateName() &
      validatePassword() &
      validateEmail() &
      validateImage() &
      validateTypeUser() &
      validateTypeLanguage() &
      validateDescription();
  } else {
    isValid =
      validateUserName() &
      validateName() &
      validatePassword() &
      validateEmail() &
      validateImage() &
      validateTypeUser() &
      validateTypeLanguage() &
      validateDescription();
  }
  if (!isValid) {
    alert("form không đúng");
    return false;
  }
  return true;
}

//====================Xử lý hỗ trợ các button Thêm, xoá và sửa thông tin========================================
// Hàm Get
function getConductUsers() {
  // axios({
  //   url: "https://62fa78c93c4f110faa9a02b9.mockapi.io/conductUsers",
  //   method: "GET",
  // })
  apiGetConductUsers()
    .then((reponse) => {
      console.log("API conductUsers: ", reponse.data);
      // duyệt qua danh sách đối tượng để tạo danh sách users
      users = reponse.data.map((user) => {
        return new Users(
          user.id,
          user.userName,
          user.name,
          user.password,
          user.email,
          user.image,
          user.typeUser,
          user.typeLanguage,
          user.description
        );
      });
      // hiển thị danh sách ra giao diện
      display(users);
    })
    .catch((error) => {
      console.log(error);
    });
}
// Hàm Display
function display(users) {
  let output = users.reduce((result, user, index) => {
    console.log(users);
    return (
      result +
      `
        <tr>
        <td>${index + 1}</td>
        <td>${user.userName}</td>
        <td>${user.name}</td>
        <td>${user.password}</td>
        <td>${user.email}</td>
        <td>${user.typeLanguage}</td>
        <td>${user.typeUser}</td>
        <td>
      <button 
      class="btn btn-success my-1" 
      data-id="${user.id}" 
      data-type="edit" 
      data-toggle="modal" 
      data-target="#myModal"
      >Sửa</button>
      <button 
      class="btn btn-danger" 
      data-id="${user.id}" 
      data-type="delete"
      >Xoá</button>
      </td>
        `
    );
  }, "");
  dom("#tblDanhSachNguoiDung").innerHTML = output;
}
// Hàm resetForm
function resetForm() {
  dom("#MaUser").value = "";
  dom("#TaiKhoan").value = "";
  dom("#HoTen").value = "";
  dom("#MatKhau").value = "";
  dom("#Email").value = "";
  dom("#HinhAnh").value = "";
  dom("#loaiNguoiDung").value = "Chọn loại người dùng";
  dom("#loaiNgonNgu").value = "Chọn ngôn ngữ";
  dom("#MoTa").value = "";
}
//====================Thêm vào các button trên trang web========================================
// I . Thêm thông tin user
function addUser(user) {
  let isValid = validateForm();
  if (!isValid) {
    return;
  }
  apiAddUser(user)
    .then(() => {
      getConductUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}
// II. Xoá thông tin user
function deleteUser(userId) {
  apiDeleteUser(userId)
    .then(() => {
      getConductUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}
// III. Update thông tin
function updateUser(userId, user) {
  let isValid = validateForm("edit");
  if (!isValid) {
    return;
  }
  apiUpdateUser(userId, user)
    .then(() => {
      getConductUsers();
    })
    .catch((error) => {
      console.log(error);
    });
}
//=========================Xử lý Dom và gọi sự kiện button===================================
// I. Xử lý sự kiện button Thêm
// Dom đến button Thêm, thay đổi title và thêm button vào footer form
dom("#btnThemNguoiDung").addEventListener("click", () => {
  dom(".modal-header").innerHTML = "Thêm thông tin người dùng";
  dom(".modal-footer").innerHTML = ` 
  <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
  <button class="btn btn-success" data-type="add">Thêm</button>
  `;
  // reset form sau khi cập nhật và thêm thông tin
  resetForm();
});
dom(".modal-footer").addEventListener("click", (evt) => {
  let typeEl = evt.target.getAttribute("data-type");
  // dom lấy dữ liệu input
  let id = dom("#MaUser").value;
  let userName = dom("#TaiKhoan").value;
  let name = dom("#HoTen").value;
  let password = dom("#MatKhau").value;
  let email = dom("#Email").value;
  let image = dom("#HinhAnh").value;
  let typeUser = dom("#loaiNguoiDung").value;
  let typeLanguage = dom("#loaiNgonNgu").value;
  let description = dom("#MoTa").value;
  // tạo Object để hứng dữ liệu
  let user = new Users(
    null,
    userName,
    password,
    name,
    email,
    image,
    typeUser,
    typeLanguage,
    description
  );
  // button add
  if (typeEl === "add") {
    addUser(user);
    // button update
  } else if (typeEl === "update") {
    updateUser(id, user);
  }
});

// II. Xử lý sự kiện button Xoá
dom("#tblDanhSachNguoiDung").addEventListener("click", (evt) => {
  console.log(evt.target);
  let id = evt.target.getAttribute("data-id");
  let typeEl = evt.target.getAttribute("data-type");
  if (typeEl === "delete") {
    deleteUser(id);
  }
  // III. Xử lý sự kiện button Edit
  else if (typeEl === "edit") {
    dom(".modal-title").innerHTML = "Cập nhật thông tin";
    dom(".modal-footer").innerHTML = `
      <button class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
      <button class="btn btn-success" data-type="update">Cập nhật</button>
      `;
  }
  // lấy dữ liệu từ server xuống để fill thông tin
  apiGetUserById(id)
    .then((reponse) => {
      console.log(reponse);
      let user = reponse.data;
      // fill thông tin lên form
      dom("#MaUser").value = user.id;
      dom("#TaiKhoan").disabled = true;
      dom("#TaiKhoan").value = user.userName;
      dom("#HoTen").value = user.password;
      dom("#MatKhau").value = user.name;
      dom("#Email").value = user.email;
      dom("#HinhAnh").value = user.image;
      dom("#loaiNguoiDung").value = user.typeUser;
      dom("#loaiNgonNgu").value = user.typeLanguage;
      dom("#MoTa").value = user.description;
    })
    .catch((error) => {
      console.log(error);
    });
});
