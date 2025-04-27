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
        <Card sx={{ minWidth: 275, border: '1px solid gray', boxShadow: '3px 4px .5px .5px gray' }} >
            <CardContent>
                <div className='flex justify-start items-center gap-2'>
                    <Typography color={`${color}`}>
                        {icon}
                    </Typography>
                    <Typography variant="body2" >
                        {name}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate(`/${href}`)} sx={{
                    color: 'black',
                    background: 'white',
                    '&:hover': { opacity: 0.8 }
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
        icon: <BiSolidCategory size={20} />,
        color: 'red',
    }, {
        id: 2,
        name: 'BÀI BÁO',
        href: 'article',
        icon: <GrArticle size={20} />,
        color: 'blue',
    }];
    return (
        <div className='w-full grid grid-cols-4 gap-5 not-lg:grid-cols-3 p-4 min-h-screen bg-white'>
            {managerList.map((elem) => (
                <div key={elem.id} className='col-span-1 not-md:col-span-3'>
                    <DashboardItem name={elem.name} href={elem.href} color={elem.color} icon={elem.icon} />
                </div>
            ))}
        </div>
    )
}
