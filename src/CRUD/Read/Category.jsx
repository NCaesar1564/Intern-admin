import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const defaultImage = "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
const Table = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("https://sheetdb.io/api/v1/yzelvmaoczxfc")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleOpenDialog = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sheetdb.io/api/v1/yzelvmaoczxfc/id/${id}`);
      setCategories(categories.filter(a => a.id !== id));
      setSelectedCategory(null);
    }
    catch (err) {
      console.error(err)
    }
    handleCloseDialog();
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 700, width: "100%" }}
      >
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              {[
                "ID",
                "Name",
                "Href",
              ].map((title) => (
                <TableCell
                  key={title}
                  sx={{ color: "black", fontWeight: "bold" }}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow
                key={category.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#fffde7",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.href}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button variant="outlined" color="primary">Update</Button>
                    <Button variant="outlined" color="error" onClick={() => handleOpenDialog(category)}>Delete</Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa danh mục:{" "}
            <strong>{selectedCategory?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={() => handleDelete(selectedCategory?.id)} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const NameTable = ({ name, description }) => (
  <Box sx={{ px: 2, pt: 2 }}>
    <Typography variant="h5" fontWeight="bold">
      {name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Box>
);
export const TableCategory = () => (
  <div className="w-full flex justify-end ">
    <div className="w-5/6 flex justify-center">
      <div className="w-full py-2">
        <NameTable
          name="Category Table"
          description="Description for Category table"
        />
        <Table />
      </div>
    </div >
  </div>
);

export default TableCategory;
