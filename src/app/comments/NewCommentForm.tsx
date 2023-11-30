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
import { useCreateArticleComment } from '../../apis/createArticleCommet';
import { joinProductImage } from '@/utils/images';
import { useSession } from 'next-auth/react';

const schemaComment = z.object({
  message: z.any(),
});

type ICommentForm = {
  message: string;
};


type NewCommentFormProps = {
  refetch: any
}
const NewCommentForm = ({ refetch }: NewCommentFormProps) => {
  const { data: session } = useSession()
  const { articleId } = useParams()
  const searchParams =  useSearchParams()
  const commentUserName =  searchParams?.get("commentUserName")
  const intl =  useIntl()

  const { mutate: createComment , isLoading: isCreatingComment, isSuccess: isCommentCreated } = useCreateArticleComment()
  const handleAddComment = (data: any) => {
    createComment({
      ...data,
      blogId: articleId
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
          position="relative"
          alignItems="start"
        >

          <Avatar src={joinProductImage(session?.user?.imageUrl ?? "")}  w={{ base: '50px', md: '70px' }}   h={{ base: '50px', md: '70px' }}  />
        
          
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
              minW: { base: '100%', md: '600px' },
              minH: "100px"
            }}
            pr={{ base: 0, md: '220px' }}
            // preValue={commentUserName}
          >
        
          </TextAreaField>

          <HStack py={{ base:  "5px", md: "16px"}} alignItems="center" h="100%">
           
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


export default NewCommentForm;
