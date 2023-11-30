import { z } from 'zod';
import {
  Avatar,
  Button,
  HStack,
} from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form } from '@/components/Form';
import TextAreaField from '@/components/Form/TextAreaField';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useReplyOnArticleComment } from '../../apis/replyOBlogComment';
import { Box } from '@/components/chakra';
import { useSession } from 'next-auth/react';
import { joinProfileImage } from '@/utils/images';

const schemaComment = z.object({
  message: z.any(),
});

type ICommentForm = {
  message: string;
};


type NewArticleReplyFormProps = {
  refetch: any
}
const NewArticleReplyForm = ({ refetch }: NewArticleReplyFormProps) => {
  const { data } = useSession()
  const { articleId } = useParams()
  const searchParams =  useSearchParams()
  const intl =  useIntl()

  const { mutate: replyOnArticleComment, isLoading: isCreatingComment, isSuccess: isCommentCreated } = useReplyOnArticleComment()
  const handleAddComment = (data: any) => {
    replyOnArticleComment({
      ...data,
      commentId: searchParams?.get("replyOn") as string,
    })
  };

  useEffect(  ()=>{
    if(isCommentCreated){
      refetch()
    }
  } , [isCommentCreated])

  return (
    <Form<ICommentForm, typeof schemaComment>
      schema={schemaComment}
      onSubmit={handleAddComment}
    >
      {({ register, formState, setValue }) => (
        <HStack
          py="7px"
          spacing={{ base: "5px", md: "10px" }}
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          pl={{ base: "50px", md: "100px" }}  
          position="relative"
          alignItems="start"
        >
          <Box 
            position="absolute" 
            left={{ base: '25px', md: '35px' }} 
            top="0"
            h={{ base: '32px', md: '42px' }}
            width={{ base:  "calc(50px - 25px)", md: "calc(100px - 35px)" }}  
            borderBottomLeftRadius="xl"
            borderLeft="2px solid"
            borderBottom="2px solid"
            borderColor="black.200">  
          </Box>
         
                
          <Avatar src={joinProfileImage(data?.user?.imageUrl ?? "")}  w={{ base: '50px', md: '70px' }}   h={{ base: '50px', md: '70px' }}  />
          <TextAreaField
            registration={register('message')}
            error={formState.errors['message']}
            label={''}
            placeholder={intl.formatMessage({  id : "commentOnEvent"})}
            inputStyle={{
              variant: 'primary',
              fontSize: 'md',
              size: 'lg',
              fontWeight: 'normal',
              minW: { base: '100%', md: '600' },
              minH: "100px"
            }}
            pr={{ base: 0, md: '220px' }}
            // preValue={commentUserName}
          >
        
          </TextAreaField>

          <HStack py={{ base:  "5px", md: "16px"}}>
           
            <Button
              variant="primaryFill"
              px={10}
              borderRadius="3xl"
              type="submit"
              isLoading={isCreatingComment}
            >
              <FormattedMessage id="confirmer" />
            </Button>
          </HStack>
        </HStack>
      )}
    </Form>
  );
};


export default NewArticleReplyForm;
