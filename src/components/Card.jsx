import React from 'react'
import { BiSolidCategory } from 'react-icons/bi'
import { GrArticle } from 'react-icons/gr'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export const DashboardItem = ({ name, href, icon, color }) => {
    const navigate = useNavigate()
    return (
        <Card sx={{ minWidth: 275, background: `${color}`, backdropFilter: 'blur(8px)' }} >
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {icon}
                </Typography>
                <Typography variant="body2">
                    {name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/${href}`)} sx={{
                    color: 'black',
                    background: 'white',
                    '&:hover': {opacity: 0.8}
                }}>GO</Button>
            </CardActions>
        </Card>
    )
}
export default function ListCard() {
    const managerList = [{
        id: 1,
        name: 'DANH MỤC',
        href: 'category',
        icon: <BiSolidCategory />,
        color: 'red',
    }, {
        id: 2,
        name: 'BÀI BÁO',
        href: 'article',
        icon: <GrArticle />,
        color: 'blue',
    }];
    return (
        <div className='w-full grid grid-cols-4 gap-5'>
            {managerList.map((elem) => (
                <div key={elem.id}>
                    <DashboardItem name={elem.name} href={elem.href} color={elem.color} />
                </div>
            ))}
        </div>
    )
}
