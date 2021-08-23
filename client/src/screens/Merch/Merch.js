import React, { Component, Fragment } from 'react';
import { Box, Flex, Text, Image, Heading, Stack, Badge, IconButton, Select } from '@chakra-ui/react';
import { PlaylistAdd, CartAdd } from 'components/Icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import toast from 'util/toast';
// import { FADE_IN } from 'style/animations';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import theme from 'theme.js';
import { FADE_IN } from 'style/animations';


const AlbumCardContainer = styled(Box)`
    ${FADE_IN}
`;
const ArtistDetail = styled(Flex)`
    ${FADE_IN}
`;

const AlbumSongList = styled(Box)``;

// const AlbumCard = styled(Flex)``;

// const CardAnimation = styled(Flex)`
//   ${FADE_IN}
// `;

class Merch extends Component {
    addToCart = (id, type) => {

        const size = document.getElementById('sizeSelect');

        if (size.value === "") {
            toast(`Please select size`);
            return
        }

        if (this.props.auth) {
            this.props.UserActions.addToCart(id, type, size.value, this.props.auth);
            toast(`Added to your Cart`);
        } else {
            this.props.history.push('/signup');
        }

    };

    render() {
        let { pending, match, albums, artists, products } = this.props;

        let productName = match.params.name.replaceAll('-', ' ');

        let currentProduct = products.filter((p) => p.product_name === productName)[0];

        console.log(currentProduct)
        let currentArtist = artists.filter((a) => a._id === currentProduct.artist)[0];
        let artistAlbums = albums.filter((a) => a.artist_name === currentArtist.artist_name);

        if (pending || pending === undefined) {
            return <div>loading</div>;
        }

        const createDropdown = (product) => {
            const quantity = JSON.parse(product.quantity);

            let optionItems = []

            Object.entries(quantity).forEach(([size, quantity]) => {
                optionItems.push(<option key={size} value={size} disabled={!quantity}>{size}</option>)
            })

            return (
                <Select placeholder="size" id="sizeSelect" isRequired>
                    {optionItems}
                </Select>
            )
        }

        return (
            <Fragment>
                {currentProduct && (
                    <Flex mt='80px' maxW='900px' mx='auto' direction={{ xs: 'column', md: 'row' }}>
                        <Flex flex='7'>
                            <AlbumCardContainer color='white' flex='1' px={2}>
                                <Box display={{ md: 'flex' }} direction='column' bg='white' borderRadius="20px" boxShadow='0 2px 4px 0 rgba(0,0,0,.25)'>
                                    <Box color='black' width='100%'>
                                        <Image src={`/uploads/${currentProduct.art_name}`} width='100%' borderRadius={{ sm: '20px 20px 0 0', md: "20px 0 0 20px" }} />
                                    </Box>
                                    <Flex color='black' width='100%' justify='space-between' style={{ position: 'relative' }} pb={16}>
                                        <Box color='black' width='100%' px={{ xs: 2, sm: 4 }} py={{ xs: 4, sm: 4 }}>
                                            <Box d='flex' alignItems='baseline' mb={2} color='white'>
                                                {currentProduct.tags.map((tag, i) => (
                                                    <Badge px='2' bg={`${theme.colors.etGreen}`} variantColor='white' mr={1} key={i}>
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </Box>

                                            <Heading
                                                mb={1}
                                                display='block'
                                                color='gray.600'
                                                fontSize={['sm', 'md', 'lg', 'xl']}
                                                as='h6'
                                                size='md'
                                                lineHeight='normal'
                                                fontWeight='semibold'
                                                textAlign='left'
                                            >
                                                {currentProduct.product_name}
                                            </Heading>

                                            <Text
                                                fontWeight='light'
                                                textTransform='uppercase'
                                                letterSpacing='wide'
                                                textAlign='left'
                                                color='gray.500'
                                                fontSize={['xs', 'sm', 'md', 'lg']}
                                            >
                                                {currentProduct.artist_name}
                                            </Text>

                                            <Box py={4}>{currentProduct.description}</Box>

                                            <Box my={8} width="100px">
                                                {currentProduct?.quantity && createDropdown(currentProduct)}
                                            </Box>
                                        </Box>

                                        <Box color='black' px={{ xs: 2, sm: 4 }} py={{ xs: 4, sm: 4 }} textAlign='right' style={{ position: 'absolute', top: 0, right: 0 }}>
                                            ${currentProduct.price}.00
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
                                                //icon={() => <CartAdd color={`${theme.colors.etGreen}`} />}
                                                icon={() => <p>add to cart</p>}
                                                onClick={() => this.addToCart(currentProduct._id, currentProduct.type)}
                                            />
                                        </Flex>
                                    </Flex>
                                </Box>
                            </AlbumCardContainer>
                        </Flex>
                        <ArtistDetail flex='1' direction='column' width={{ sm: '300px' }} margin={{ sm: 'auto', md: '0px' }} py={{ sm: '40px', md: '0px' }}>
                            <Box color='black' width='100%' p='8px'>
                                <>
                                    <Link to={`/artist/${currentProduct.artist_name.replaceAll(' ', '-')}`}>
                                        <Image src={`/uploads/${currentArtist.artist_img}`} width='100%' borderRadius="10px" boxShadow='0 2px 4px 0 rgba(0,0,0,.25)' />
                                        <Text>
                                            <b>{currentArtist.artist_name}</b>
                                        </Text>
                                    </Link>
                                </>
                            </Box>

                            <div style={{ margin: '32px 0 0 8px' }}>
                                <b>discography</b>
                            </div>
                            <Box color='black' width='100%' p='8px'>
                                {artistAlbums.map((album, i) => (
                                    <div key={i}>
                                        <Link to={`/music/${album.album_name.replaceAll(' ', '-')}`}>
                                            <Image src={`/uploads/${album.art_name}`} borderRadius="10px" boxShadow='0 2px 4px 0 rgba(0,0,0,.25)' />
                                            <Text>{album.album_name}</Text>
                                        </Link>
                                    </div>
                                ))}
                            </Box>
                        </ArtistDetail>
                    </Flex>
                )}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        albums: state.music.albums,
        artists: state.music.artists,
        products: state.music.products,
        albumCollection: state.user.albumCollection,
        playlist: state.user.playlist,
        auth: state.user.authenticated,
        updatedAt: state.music.updatedAt,
        updatedUserAt: state.user.updatedAt,
        pending: state.pender.pending['music/GET_ALBUMS'],
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
    }),
)(Merch);
