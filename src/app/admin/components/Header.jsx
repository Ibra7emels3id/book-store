'use client'
import React, { memo } from 'react';
import CategoryIcon from '@mui/icons-material/Category';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../../FirebaseConfig';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';


const Header = () => {
    const router = useRouter()
    const [user, loading, error] = useAuthState(auth);
    const userId = user?.uid


    // handle Log Out User Account
    const HandleLogOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.info('تم تسجيل الخروج ', {
                position: 'bottom-center',
                autoClose: 2000,
                type: 'info',
                progress: undefined
            })
            router.push('/admin/login')
        }).catch((error) => {
            // An error happened.
        });
    }

    // Set Loading
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <nav className="bg-[#ededed] z-[1000] h-screen fixed top-12 right-0 md:min-w-[250px] py-6 md:px-4 font-[sans-serif]">
                <div className="overflow-auto py-6 h-full mt-4 w-full">
                    <ul className="space-y-1 flex items-start flex-col w-full">
                        <li className='w-full'>
                            <Link
                                href="/admin"
                                className="text-black hover:text-green1 text-[15px] font-bold flex items-center hover:bg-white rounded px-4 py-3 transition-all"
                            >
                                <DashboardIcon />
                                <span className=' hidden md:flex mx-2 text-lg'>الرئيسية</span>
                            </Link>
                        </li>
                        <li className='w-full'>
                            <Link
                                href="/admin/products"
                                className="text-black hover:text-green1 text-[15px] font-bold flex items-center hover:bg-white rounded px-4 py-3 transition-all"                            >
                                <AddBusinessIcon />
                                <span className=' hidden md:flex px-2'>المنتجات</span>
                            </Link>
                        </li>
                        <li className='w-full '>
                            <Link
                                href="/category"
                                className="text-black hover:text-green1 text-[15px] font-bold flex items-center hover:bg-white rounded px-4 py-3 transition-all"                            >
                                <CategoryIcon />
                                <span className=' hidden md:flex mx-2 text-lg'>أقسام الكتب</span>
                            </Link>
                        </li>
                        <li className='w-full'>
                            <Link
                                href="/admin/order"
                                className="text-black hover:text-green1 text-[15px] font-bold flex items-center hover:bg-white rounded px-4 py-3 transition-all"                           >
                                <LibraryAddCheckIcon/>
                                <span className=' hidden md:flex mx-2 text-lg'>أوردر</span>
                            </Link>
                        </li>
                        <li className='w-full'>
                            <button
                                onClick={() => {
                                    HandleLogOut()
                                }}
                                className="text-black hover:text-green1 text-[15px] font-bold flex items-center hover:bg-white rounded px-4 py-3 transition-all w-full"
                            >
                                <PowerSettingsNewIcon />
                                <span className=' hidden md:flex mx-2 text-lg'>تسجيل الخروج</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="px-5 py-2 flex z-[1000] bg-[#ededed] items-center w-full  justify-between fixed h-[70px] ">
                <div className="flex items-center space-x-4">
                    <div className="relative flex flex-col">
                        <Link href="/" className=' p-3  mt-1'>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 3670 3870"><g fill="#3aaf9e"><path d="M865 3861c-7-12 23-32 160-111 388-222 688-507 702-668 6-67-9-83-67-72-126 25-230 4-283-59-40-48-43-88-19-258 31-223 60-267 177-268 104 0 157 50 221 208 29 71 37 82 56 79 52-6 192-84 287-160l23-19-45-26c-47-28-61-49-52-77 10-30 35-31 94-4 76 34 127 34 194-4 61-34 97-30 97 12 0 29-19 50-70 76-28 14-41 29-50 57-28 86-74 155-158 234-69 66-103 89-193 132l-108 52-1 80c-1 267-103 475-294 603-88 59-174 89-386 136-85 19-175 42-199 50-49 18-77 20-86 7zM2542 3850c-41-25-47-40-32-85 15-47 33-53 69-24 15 13 37 29 47 35 18 11 18 12 0 52-21 47-36 51-84 22zM5 3830c-3-5 29-32 72-61 233-156 373-286 478-443 102-153 158-313 194-551 28-186 45-243 76-257 33-15 82 15 118 73 34 55 57 182 57 312 0 101-10 108-47 37-24-46-61-90-74-90-12 0-17 26-34 173-31 272-94 441-207 563-89 95-207 150-444 209-208 52-181 47-189 35zM1876 3678c-13-20-13-34-2-99 19-104 35-131 119-193 66-49 74-58 86-105 7-28 16-51 20-51s15 35 23 78c20 101 50 162 104 212 33 30 52 40 78 40 50 0 112-51 154-128 19-35 41-66 48-69 8-3 33 9 56 26 26 20 54 31 74 31 48 0 111-53 152-128 19-35 40-66 47-69 7-2 32 8 54 22 52 35 94 29 144-20 48-47 53-82 28-189-12-48-24-111-27-139-6-52 15-208 34-258 6-15 89-105 184-200 108-108 191-200 219-243 35-56 45-65 47-48 6 37-25 125-66 187-45 69-190 234-253 289-77 65-119 124-119 165 0 40 41 209 67 272 20 51 56 79 102 79 32 0 45-9 124-92 78-82 87-96 87-130 0-36 27-108 40-108 4 0 12 11 18 25 8 17 34 36 77 55 36 16 68 36 71 45 11 27-7 85-35 117-27 31-30 32-68 20-83-25-106-11-191 112-64 94-164 107-231 31l-31-36v28c-1 73-77 166-146 179-27 5-48 1-80-14-49-24-48-24-88 55-29 59-79 98-138 108-28 5-50 1-92-18-62-29-60-30-100 50-30 61-81 99-141 108-53 8-120-26-160-82-16-23-32-42-35-42-3-1-18 24-33 54-32 66-80 95-156 95-41 0-53-4-65-22zm182-114 68-27-20-52-21-52-45 30c-97 65-132 98-119 113 17 21 62 17 137-12z"></path><path d="M1956 3180c-51-33-52-39-20-102l14-28 41 30c41 29 59 31 59 7 0-7 7-22 15-34l15-22 50 31c54 33 56 44 24 96-18 28-23 28-68-3l-36-24-14 33c-8 18-18 36-24 39-5 4-30-7-56-23zM2666 3100c-51-33-52-39-20-102l14-28 41 30c41 29 59 31 59 7 0-7 7-22 15-34l15-22 50 31c54 33 56 44 24 96-18 28-23 28-68-3l-36-24-14 33c-8 18-18 36-24 39-5 4-30-7-56-23zM1910 2390c-17-33-3-58 38-69 400-103 520-132 546-129 27 3 31 7 34 35 3 26-1 35-20 43-33 14-543 140-567 140-11 0-25-9-31-20zM1908 2195c-9-21-9-29 3-40 8-8 140-45 293-84 298-74 326-76 326-27 0 13-6 28-13 34-17 14-528 142-567 142-23 0-33-6-42-25zM1913 2033c-17-6-16-48 1-66 8-7 52-22 98-32l83-18-3-51c-9-173-57-376-88-376-13 0-15-11-12-60 1-33 3-60 3-60s-32 9-70 20c-78 23-118 19-140-13-31-45-20-78 70-201 47-64 83-121 80-127-4-5-3-8 2-7 5 2 29-18 54-44l46-48h170c197 0 190-3 269 105 26 35 52 61 57 58 6-3 7-1 4 4-4 6 20 48 53 93 64 88 74 126 45 167-22 32-62 36-137 14l-68-20v60c0 46-3 59-15 59-9 0-20 12-26 28-22 55-56 209-62 275l-6 67 27-6c92-22 94-25 108-91 18-87 56-152 147-252 237-260 233-577-10-812-111-107-223-152-378-152-153 0-282 52-383 154-108 109-162 227-170 372-9 173 37 298 163 436 83 92 144 203 165 301 17 80 11 112-23 125-37 13-52-6-60-78-9-75-74-199-151-287-128-148-174-256-183-430-9-172 37-315 143-449 127-159 282-231 499-231s373 71 500 230c119 147 168 316 145 498-20 154-68 252-194 391-74 83-121 171-131 247-4 28-11 57-15 64-8 13-531 150-570 149-14 0-31-3-37-6z"></path><path d="M2167 916c-48-18-62-29-81-70-20-43-20-79 1-123 23-49 66-73 130-73 44 0 58 5 87 31 67 58 67 149 1 208-20 17-41 31-48 31s-21 2-32 5-37-2-58-9z"></path></g><g fill="#feb400"><path d="M3090 1813c-23-10-249-202-259-221-4-9-6-24-3-32 5-16 31-40 44-40 6 0 205 162 272 221 13 12 10 60-5 70-16 10-27 10-49 2zM1288 1799c-11-6-18-22-18-38 0-23 19-44 117-127 128-109 140-116 166-102 17 9 23 54 9 73-12 18-206 181-229 193-26 14-23 14-45 1zM2125 1386c-73-23-95-48-55-61 12-4 25-18 31-32 17-47-27-90-82-78l-29 7v-91c0-74 3-91 15-91 8 0 57 14 110 30l95 31 99-32c55-17 106-29 113-27 10 4 12 28 10 92l-4 87-28-6c-54-12-98 32-81 78 6 14 19 28 31 32 42 13 17 38-60 62-88 27-76 27-165-1zM1100 1021c-14-27-13-37 6-55 13-13 43-16 169-16 142 0 155 2 165 19 14 27 13 37-6 55-13 13-43 16-169 16-142 0-155-2-165-19zM2982 1028c-7-7-12-21-12-33 0-41 16-45 185-45 112 0 165 4 173 12 18 18 14 56-7 68-29 15-324 13-339-2zM1526 489c-110-91-135-123-119-148 5-9 22-17 37-19 22-3 46 14 127 84 112 97 125 114 109 144-20 37-54 24-154-61zM2730 551c-5-11-7-27-4-35 3-9 55-59 115-111 113-99 148-115 169-76 20 39 21 38-133 167-92 77-127 91-147 55zM2190 330c-18-18-20-34-20-156 0-74 5-144 10-155 12-21 50-25 68-7 13 13 17 295 4 314-15 22-42 24-62 4z"></path></g><path d="M2125 1386c-73-23-95-48-55-61 12-4 25-18 31-32 17-47-27-90-82-78l-29 7v-91c0-74 3-91 15-91 8 0 57 14 110 30l95 31 99-32c55-17 106-29 113-27 10 4 12 28 10 92l-4 87-28-6c-54-12-98 32-81 78 6 14 19 28 31 32 42 13 17 38-60 62-88 27-76 27-165-1zm152-9c70-22 99-37 75-37-19 0-52-43-52-67 0-13 12-35 26-49 20-20 33-25 60-22l34 4v-79c0-61-3-78-13-74-7 3-55 17-105 33l-92 27-92-27c-50-16-98-30-105-33-10-4-13 13-13 74v79l34-4c27-3 40 2 60 22 14 14 26 36 26 49 0 24-33 67-52 67-24 0 5 15 70 36 37 12 67 22 67 23 0 0 33-10 72-22z" fill="#9bd4cb"></path><g fill="#ffd46c"><path d="M2125 1380c-27-10-43-18-35-18s38 8 65 18c28 10 43 18 35 18s-37-8-65-18zM2265 1380c28-10 57-18 65-18s-7 8-35 18c-27 10-57 18-65 18s8-8 35-18zM2056 1352c-3-5 8-19 24-31 53-38 33-98-36-111-39-8-39-8-6-9 39-1 82 36 82 72 0 24-33 67-51 67-6 0-7 5-4 10 3 6 4 10 1 10s-7-4-10-8zM2354 1352c4-7 3-12-3-12-18 0-51-43-51-67 0-36 43-73 82-72 33 1 33 1-6 9-70 13-86 63-36 110 21 20 27 31 19 36-8 4-9 3-5-4z"></path><path d="M1992 1128c-1-65 1-88 11-87 18 1 114 37 101 38-6 1-31-6-54-14s-44-15-46-15-5 37-7 83l-3 82-2-87zM2422 1133c-1-46-3-83-5-83s-25 7-51 16-49 14-51 12c-3-2 20-12 51-22s58-16 60-13c3 2 3 42 1 88l-3 84-2-82z"></path></g><g fill="#ffecc0"><path d="M2056 1352c-3-5 9-19 27-31l32-22-27 24c-15 14-24 28-21 31 4 3 4 6 0 6-3 0-8-4-11-8zM2351 1356c4-4-6-20-22-36s-29-38-29-50c0-31 44-70 77-69 26 1 26 2-7 9-65 15-78 65-30 110 22 21 27 31 18 36-7 4-10 4-7 0zM2110 1272c0-29-23-53-60-62-33-7-33-8-7-9 33-1 77 38 77 69 0 11-2 20-5 20s-5-8-5-18zM1992 1128c-2-78 0-88 16-88 11 0 13 3 5 8-7 5-13 40-16 87l-3 80-2-87zM2420 1131c0-54-4-81-12-84s-6-6 5-6c15-1 17 9 17 84 0 47-2 85-5 85s-5-36-5-79z"></path></g></svg>
                        </Link>
                    </div>
                </div>
                <button onClick={() => {
                    HandleLogOut()
                }} className="h-12 w-12 flex items-center justify-center rounded-l text-black hover:text-green1 text-3xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-[18px] h-[18px]"
                        viewBox="0 0 6.35 6.35"
                    >
                        <path
                            d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                            data-original="#000000"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default memo(Header);