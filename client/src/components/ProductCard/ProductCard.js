/*
import React from 'react';
import { Box, Flex, Image, Badge, IconButton } from '@chakra-ui/react';
import { PlaylistAdd, CartAdd } from 'components/Icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import useRouter from 'hooks/useRouter';
import toast from 'util/toast';
import theme from 'theme.js';
import useWindowSize from 'hooks/useWindowSize';

const CardContainer = styled(Box)`
  ${FADE_IN}
`;

const HoverCardContainer = styled(Box)`
  cursor: pointer;
`;

const HoverCard = ({ productId, img, name }) => {
    const isMobile = useWindowSize();
    const url = name.replaceAll(' ', '-');

    return (
        <HoverCardContainer width='100%' position='relative' isMobile={isMobile}>
            <Link to={`/merch/${url}`}>
                <Image src={`/uploads/${img}`} width='100%' className='big' />
            </Link>
        </HoverCardContainer>
    );
};

const ProductCard = ({ auth, product, UserActions }) => {
    const router = useRouter();

    const addToPlaylist = (id, type) => {
        if (auth) {
            UserActions.addToPlaylist(id, type, auth);

            toast(`Saved to your Playlist`);
        } else {
            router.push('/signup');
        }
    };

    const addToCart = (id, type) => {
        if (auth) {
            UserActions.addToCart(id, type, null, auth);

            toast(`Added to your Cart`);
        } else {
            router.push('/signup');
        }
    };

    return (
        <CardContainer
            maxWidth={{ sm: '100%', md: '26.3%' }}
            boxShadow='0 2px 4px 0 rgba(0,0,0,.25)'
            bg='white'
            overflow='hidden'
            mx='8px'
            mb='16px'
            style={{ position: 'relative' }}
            borderRadius="20px"
        >
            <Box style={{ position: 'relative' }}>
                <HoverCard productId={product._id} img={product.art_name} name={product.product_name} />

                <Box p='4'>
                    <Box d='flex' alignItems='baseline'>
                        {product.tags.map((tag, i) => (
                            <Badge px='2' bg={`${theme.colors.etGreen}`} variantColor='white' mr={1} key={i}>
                                {tag}
                            </Badge>
                        ))}
                    </Box>

                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated color='gray.600'>
                        {product.product_name}
                    </Box>

                    <Box color='gray.500' mb={8}>
                        {product.artist_name}
                    </Box>

                   
                    <Flex style={{ position: 'absolute', bottom: 0, left: 0 }} width='100%'>
                        <IconButton
                            flex='1'
                            variant='ghost'
                            variantColor='teal'
                            aria-label='Add album to cart'
                            fontSize='20px'
                            style={{
                                borderTop: '1px',
                                borderRight: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(5, 174, 165, 0.3)',
                            }}
                            rounded='0px'
                            icon={() => <CartAdd color={`${theme.colors.etGreen}`} />}
                            onClick={() => addToCart(album._id, album.type)}
                        />
                        <IconButton
                            flex='1'
                            variant='ghost'
                            variantColor='teal'
                            aria-label='Add album to playlist'
                            fontSize='20px'
                            style={{
                                borderTop: '1px',
                                borderStyle: 'solid',
                                borderColor: 'rgba(5, 174, 165, 0.3)',
                            }}
                            rounded='0px'
                            icon={() => <PlaylistAdd color={`${theme.colors.etGreen}`} />}
                            onClick={() => addToPlaylist(album._id, album.type)}
                        />
                    </Flex>
                    
                </Box>
            </Box>
        </CardContainer>
    );
};

export default connect(
    (state) => ({
        auth: state.user.authenticated,
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
    }),
)(ProductCard);
*/

const ProductCard = () => { return }

export default ProductCard
