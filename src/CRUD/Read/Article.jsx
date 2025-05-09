import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box, Paper, Avatar, Typography, Table as MuiTable, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultImage =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

const formatAuthor = (name) => {
    return name
        ?.split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

const Table = () => {
    const [articles, setArticles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://sheetdb.io/api/v1/xjzqyyqrbfymx")
            .then((res) => setArticles(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleOpenDialog = (article) => {
        setSelectedArticle(article);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedArticle(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://sheetdb.io/api/v1/xjzqyyqrbfymx/id/${id}`);
            setArticles(articles.filter((a) => a.id !== id));
            setSelectedArticle(null);
        } catch (err) {
            console.error(err);
        }
        handleCloseDialog();
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 700, width: "98%", overflow: 'hidden' }} variant="outlined">
                <MuiTable stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#1976d2" }}>
                            {[
                                "ID Content",
                                "Name",
                                "Description",
                                "Image",
                                "Hashtags",
                                "Category",
                                "Author",
                                "Content",
                                "Actions",
                            ].map((title) => (
                                <TableCell key={title} sx={{ color: "black", fontWeight: "bold" }}>
                                    {title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {articles.map((article, index) => (
                            <TableRow
                                key={article.id}
                                sx={{
                                    backgroundColor: index % 2 === 0 ? "#fff" : "#fffde7",
                                    "&:hover": { backgroundColor: "#f1f1f1" },
                                }}>
                                <TableCell>{article.idContent}</TableCell>
                                <TableCell sx={{ maxWidth: 150 }}>
                                    <Tooltip title={
                                        <div style={{ maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                                            {article.nameArticle}
                                        </div>}>
                                        <Typography noWrap>
                                            {article.nameArticle}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ maxWidth: 150 }}>
                                    <Tooltip title={
                                        <div style={{ maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                                            {article.description}
                                        </div>}>
                                        <Typography noWrap>
                                            {article.description}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" justifyContent="center">
                                        <Avatar variant="rounded" src={article.imgArticle || defaultImage} alt="img" sx={{ width: 60, height: 60 }} />
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ maxWidth: 150 }}>
                                    <Tooltip title={
                                        <div style={{ maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                                            {article.hashtags}
                                        </div>}>
                                        <Typography noWrap>
                                            {article.hashtags}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{article.category}</TableCell>
                                <TableCell>{formatAuthor(article.author)}</TableCell>
                                <TableCell sx={{ maxWidth: 200 }}>
                                    <Tooltip title={
                                        <div style={{ maxHeight: 200, overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                                            {article.content}
                                        </div>}>
                                        <Typography noWrap>
                                            {article.content}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        <Button variant="outlined" color="primary" onClick={() => navigate(`/article/${article.id}`)}>
                                            Update
                                        </Button>
                                        <Button variant="outlined" color="error" onClick={() => handleOpenDialog(article)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>
            </TableContainer>

            {/* Confirmation Dialog for Delete */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa bài viết: <strong>{selectedArticle?.nameArticle}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button onClick={() => handleDelete(selectedArticle?.id)} color="error">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const NameTable = () => {
    const navigate = useNavigate()
    return (
        < Box sx={{ px: 2, py: 2, width: '100%' }}>
            <Button variant="outlined" onClick={() => navigate('/add/article')}>+ Thêm Bài Báo</Button>
        </Box >
    )

};

export const TableArticle = () => (
    <div className="w-full flex justify-end">
        <div className="w-5/6 flex justify-center not-lg:w-full">
            <div className="w-full flex flex-col items-center">
                <NameTable />
                <Table />
            </div>
        </div>
    </div>
);

export default TableArticle;
