import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const fetchUsers = createAsyncThunk("users/fetchUsers", async (QueryParams={}) => {
  try {
    const response = await axiosInstance.get("/user",{params: QueryParams});
    console.log(response.data, "users data");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});


const addUser = createAsyncThunk("users/addUser", async (user , { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/user", user);
    console.log(response.data, "user added");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    UsersLoading: false,
    UsersError: null,
    filteredUsers: [],
    addUserLoading: false,
    addUserError: null,
    totalData: 0,
    totalPages: 0,
  },
  reducers: {
     
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.UsersLoading = true;
        state.UsersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.UsersLoading = false;
        state.users = action.payload.users;
        state.filteredUsers = action.payload.users;
        state.totalData = action.payload.totalData;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.UsersLoading = false;
        state.UsersError = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.addUserLoading = true;
        state.addUserError = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserLoading = false;

        // state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addUserLoading = false;
        state.addUserError = action.payload;
        console.log(action.payload, "state.addUserError");
      });
  },
});
export { fetchUsers, addUser };
export const { setFilteredUsers } = usersSlice.actions;
export default usersSlice.reducer;
