import CommentReplyIcon from '@/assets/icons/comments/CommentReplyIcon';
import { Avatar, Box, Card, Divider, Flex, HStack, Icon, LinkBox, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormattedRelativeTime } from 'react-intl';
import uuid from 'react-uuid';
import { joinProfileImage } from '@/utils/images';
import ArticleCommentReplies from './ArticleCommentReplies';


type ArticleCommmentBoxProps = {
  comment: Comment;
}

const ArticleCommmentBox = ({comment}: ArticleCommmentBoxProps ) => {
  const pathname = usePathname()
  var now  = new Date().getTime();
  var commentTime = new Date(comment.createdAt).getTime(); 
  return (
    <Stack spacing={0} position="relative" >
      <HStack spacing={{ base: 2, md: 10 }} alignItems="stretch" maxW={"600px"}>
        <Avatar src={joinProfileImage(comment?.owner?.imageUrl)}  w={{ base: '50px', md: '70px' }}   h={{ base: '50px', md: '70px' }}  />
        <Card
          flexGrow={1}
          maxW={{ base: 'auto', md: 700 }}
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
        >
          <Flex justifyContent="space-between" columnGap={{ base: "20px" , md: "50px"}} >
            <Stack flexGrow={1}  maxW={{base:  "calc(100%-70px)" ,  md:  "calc(100%-150px)"}}>
              <HStack alignItems="center">
                <Text fontWeight={'bold'} fontSize="sm">
                  {comment?.owner?.displayName}{' '}
                </Text>
                <Divider  h="100%" w="0px" border="1px solid" borderColor="gray.200" />
                <Text color="gray.600" fontWeight="semibold" fontFamily="Cairo !important" fontSize="sm" >
                  <FormattedRelativeTime
                    key={comment?.id ?? uuid()}
                    value={(commentTime - now) / 1000}
                    numeric="auto"
                    updateIntervalInSeconds={60}
                  />
                </Text>
              </HStack>
              <Text
                noOfLines={3}
                overflow="hidden"
                textOverflow="ellipsis"
                color="gray.600"
                maxW="100%"
                fontSize="sm"
                wordBreak={'break-word'}
              >
                {comment?.message}
              </Text>
            </Stack>
            <Stack alignItems="center" justifyContent="center"  w={{ base:"50px", md: "100px"}}  >
              <LinkBox>
                <Link scroll={false}  href={`${pathname}?replyOn=${comment?.id}&commentUserName=${comment?.owner?.displayName}`} >
                  <Icon fill="gray.500" stroke="gray.500" fontSize="15px"  cursor="pointer" >
                    <CommentReplyIcon />
                  </Icon>
                
                </Link>
              
              </LinkBox>
              
            </Stack>
          </Flex>
        </Card>
        {/* <Box position="absolute" left={{ base: '25px', md: '35px' }} top={{ base: '50px', md: '70px' }} height="calc(100% - 70px)" width="3px" bg="red" >

        </Box> */}
      </HStack>
      <ArticleCommentReplies commentId={comment?.id} />
    </Stack>
  );
};

export default ArticleCommmentBox;
