import React from 'react'
import { Image, Container } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function UserAvatar() {

    const { data, loading } = useQuery(AVATAR_IMAGE_QUERY);
    return (
        <>
            {loading ?
                (<div>loading...</div>)
                :
                (
                    <Container>
                        {data.files.length > 0 ? data.files.map(x => (
                            
                            <Image
                                floated='right'
                                size='mini'
                                key={x}
                                src={`http://localhost:4000/images/${x}`}
                                alt={x}
                            />
                        ))
                            :
                            <div>Add your image</div>
                            // <Image
                            //     floated='right'
                            //     size='mini'
                            //     src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            // />
                        }
                    </Container>
                )}
        </>
    )
}

const AVATAR_IMAGE_QUERY = gql`
  {
    files
  }
`;

export { AVATAR_IMAGE_QUERY, UserAvatar }

