import React from 'react'
import { BiSolidCategory } from 'react-icons/bi'
import { GrArticle } from 'react-icons/gr'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const DashboardItem = ({ name, href, icon }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {icon}
                </Typography>
                <Typography variant="body2">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/${href}`)}>GO</Button>
            </CardActions>
        </Card>
    )
}
export default function ListCard() {
    const managerList = [{
        id: 1,
        name: 'Danh mục',
        href: 'category',
        icon: <BiSolidCategory />
    }, {
        id: 2,
        name: 'Bài báo',
        href: 'article',
        icon: <GrArticle />
    }];
    return (
        <div className='grid grid-cols-4'>
            {managerList.map((elem) => (
                <div key={elem.id}>
                    <DashboardItem name={elem.name} href={elem.href} />
                </div>
            ))}
        </div>
    )
}
