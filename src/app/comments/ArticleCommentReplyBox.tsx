import CommentReplyIcon from '@/assets/icons/comments/CommentReplyIcon';
import If from '@/common/If';
import Rating from '@/components/Form/Rating';
import { PROFILE_PICTURE_URL } from '@/consts/imageFolders';
import { EventCommentListEntity } from '@/features/events/types/comments';
import { Avatar, Box, Card, Divider, Flex, HStack, Icon, LinkBox, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormattedRelativeTime } from 'react-intl';
import uuid from 'react-uuid';


type ArticleCommentReplyBoxProps = {
  comment: EventCommentListEntity;
  hasNext: boolean;
  index: number;
}

const ArticleCommentReplyBox = ({comment , hasNext , index}: ArticleCommentReplyBoxProps ) => {
  const pathname = usePathname()
  var now  = new Date().getTime();
  var commentTime = new Date(comment.createdAt).getTime(); 
  return (
      <HStack 
        position="relative" 
        py="7px"
        pl={{ base: "50px", md: "100px" }}  
        my={0}
        spacing={{ base: 2, md: 10 }} alignItems="stretch"
      >

        <Box 
          position="absolute" 
          left={{ base: '25px', md: '35px' }} 
          top="0px"
          height={{ base: '32px', md: '42px' }}
          width={{ base:  "calc(50px - 25px)", md: "calc(100px - 35px)" }}   
          borderBottomLeftRadius="xl"
          borderLeft="2px solid"
          borderBottom="2px solid"
          borderColor="black.200"
        >  
        </Box>

        <If condition={hasNext} >
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

              

        <Avatar src={`${PROFILE_PICTURE_URL}${comment.owner.imageUrl}`}  w={{ base: '50px', md: '70px' }}   h={{ base: '50px', md: '70px' }}  />
        <Card
          flexGrow={1}
          maxW={{ base: 'auto', md: 700 }}
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
        >
          <Flex justifyContent="space-between" columnGap={"50px"} >
            <Stack flexGrow={1}  >
              <HStack alignItems="center">
                <Text fontWeight={'bold'} fontSize="sm">
                  {comment?.owner?.displayName}{' '}
                </Text>
                <Divider  h="100%" w="0px" border="1px solid" borderColor="gray.200" />
                <Text color="gray.600" fontWeight="semibold" fontFamily="Cairo !important"fontSize="sm" >
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
            {/* <Stack alignItems="center" justifyContent="center" maxW="100px" w="100px" flexGrow={1} >
              <LinkBox>
                <Link href={`${pathname}?replyOn=${comment?.id}`} >
                  <Icon fill="gray.500" stroke="gray.500" fontSize="20px"  cursor="pointer" >
                    <CommentReplyIcon />
                  </Icon>
                
                </Link>
              
              </LinkBox>
              
            </Stack> */}
          </Flex>
        </Card>
      </HStack>

  );
};

export default ArticleCommentReplyBox;
