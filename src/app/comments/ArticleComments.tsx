'use client'
import { Flex, Heading, Stack, Text } from '@/components/chakra'
import React, { startTransition, useEffect, useState } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { Box, Divider} from '@chakra-ui/react';
import { useParams, useSearchParams } from 'next/navigation';



import '@/assets/css/day-picker.css';
import NewCommentForm from './NewCommentForm';
import { UseArticleComments } from '../../apis/getArticleComments';
import ArticleCommmentBox from './ArticleCommmentBox';
import uuid from 'react-uuid';


const ArticleComments = () => {
    const searchParam = useSearchParams();

    const   { articleId } = useParams()

    const  { data: comments , refetch: refetchComments, fetchNextPage, hasNextPage } = UseArticleComments({
        articleId: articleId as string
    })


    
    const  commentsData = comments?.pages.flatMap((page) => page.comments);



    useEffect(() => {
        document
          .getElementById(`reply-${searchParam.get('replyOn')}`)
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      }, [searchParam.get('replyOn')]);
 
  

    return (
        <Stack py="15px" spacing="20px" >     
            <Heading fontSize="20px" >
                <FormattedMessage id="theComments" />
            </Heading>

            <Divider  boxShadow="xl" />


            <Stack py="20px" spacing="10px"  maxH="700px" overflowY="scroll">
                    {
                        commentsData?.map((comment: Comment)=>{
                            return(
                                <ArticleCommmentBox key={comment?.id ?? uuid()} comment={comment} />
                            )
                        })
                    }

            </Stack>

                


            <NewCommentForm refetch={refetchComments} />


            

        
            

        </Stack>
    )
}

export default ArticleComments