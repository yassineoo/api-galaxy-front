'use client'
import { Button, Box, Heading, Stack, Text } from '@/components/chakra'
import React, { startTransition, useState } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { useParams, useSearchParams } from 'next/navigation';

import { DateRangePicker } from 'react-date-range';

import { ar, arDZ } from 'date-fns/locale';
import Calendar from 'react-calendar';


import '@/assets/css/day-picker.css';
import NewCommentForm from './NewCommentForm';
import ClientEventCommmentBox from './ArticleCommmentBox';
import { UseEventComments } from '@/features/events/apis/comments/getEventComments';
import { EventCommentListEntity } from '@/features/events/types/comments';

import InfiniteScroll from 'react-infinite-scroll-component';
import uuid from 'react-uuid';
import ClientEventCommentReplyBox from './ArticleCommentReplyBox';
import If from '@/common/If';
import NewArticleReplyForm from './NewArticleReplyForm';
import { useArticleCommentsReplies } from '../../apis/getArticleCommentReplies';
import { motion } from 'framer-motion';


type ArticleCommentRepliesProps = {
    commentId: string;
}

const wrapperButtonVariats =  {
    hidden: {
        opacity: 0,
    },

    show: {
       opacity: 1,
        transition: {
            duration: 0.7
        }
    }
  }

const ArticleCommentReplies = ({ commentId }: ArticleCommentRepliesProps) => {

    const searchParams = useSearchParams()

    const replyOn =  searchParams?.get("replyOn")

    // const   { eventId } = useParams()

    const  { data: replyPages , refetch: refetchComments, isFetching, fetchNextPage, hasNextPage } = useArticleCommentsReplies({
        commentId: commentId as string
    })


    
    const  replies = replyPages?.pages.flatMap((page) => page.comments);

  

    return (
        <Stack py="15px" spacing={0} >  
            {/* <Box position="absolute" left={{ base: '25px', md: '35px' }} top={{ base: '50px', md: '70px' }} height="calc(100% - 70px)" width="3px" bg="red"  >  </Box> */}
              
   

            <Stack maxW={"600px"}  spacing={0}>
                {
                    replies?.map((comment: any, index: number)=>{
                        return(
                            <ClientEventCommentReplyBox 
                                key={comment?.id ?? uuid()} 
                                comment={comment} 
                                hasNext={hasNextPage || index != replies?.length - 1 || searchParams?.get("replyOn") ===  commentId}
                                index={index}

                            
                            />
                        )
                    })
                }

            </Stack>
            <If condition={hasNextPage} >
                <Box
                    pl={{ base: "10px", md: "100px" }}  
                    position="relative"
                >
                    <Box 
                        position="absolute" 
                        left={{ base: '25px', md: '35px' }} 
                        top="0"
                        height="50%"
                        width={{ base:  "calc(50px - 25px)", md: "calc(100px - 35px)" }}  
                        borderBottomLeftRadius="xl"
                        borderBottom="2px solid"
                        borderLeft="2px solid"
                        borderColor="black.200">  
                    </Box>
                    <If condition={searchParams?.get("replyOn") === commentId} >

                        <Box 
                            position="absolute" 
                            left={{ base: '25px', md: '35px' }} 
                            top="0"
                            height="100%"  
                            borderLeft="2px solid"
                            borderColor="black.200"
                        >  
                        </Box>

                    </If>

                    <Button  
                        w="200px" 
                        onClick={fetchNextPage} 
                        variant="transparent"   
                        as={motion.button}
                        variants={wrapperButtonVariats}
                        initial="show"
                        isLoading={isFetching}
                    
                    >
                            <FormattedMessage id="readmore" />{` ... `}
                    </Button>

                </Box>

            </If>


               

            <div id={`reply-${commentId}`} >
                <If condition={replyOn === commentId} >
                    <NewArticleReplyForm refetch={()=>{}} />
                </If>
            </div>




            

        
            

        </Stack>
    )
}

export default ArticleCommentReplies