import React from 'react';

import {ICard} from "../contexts/interfaces";

import {MOCK_URL} from "../constants/constants";
import {getResponse} from "../api/api";
import {GalleryContext} from "../contexts/GalleryContext";
import CardsGrid from "../components/CardsGrid/CardsGrid";
import ErrorBoundary from "./ErrorBoundary";
import {getAlbumsIds} from "../utils/utils";

declare interface IState {
    data?: ICard[];
    error?: string;
    isLoading?: boolean;
}

export default class CardContainer extends React.Component<any, IState> {
    state: IState = {
        data: undefined,
        error: undefined,
        isLoading: true
    };

    componentDidMount() {
        getResponse(
            MOCK_URL
        )
            .then((response: ICard[]) => {
                this.setState({data: response, isLoading: false});
            })
            .catch((err: any) => {
                this.setState({error: err, isLoading: false});
                console.error("Error is: ", err);
            });
    }

    render() {
        const {data, isLoading} = this.state;

        const contextGallery = {
            data,
            albums: getAlbumsIds(data)
        }

        return (
            <ErrorBoundary>
                <GalleryContext.Provider value={contextGallery}>
                    {!isLoading && data && <CardsGrid/>}
                </GalleryContext.Provider>
            </ErrorBoundary>
        )
    }
}
