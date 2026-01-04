import { SimplifiedPlaylistObject } from '../../models/playlist';
import { useNavigate, useParams } from 'react-router';
import PlaylistItem from '../../common/components/PlaylistItem';

interface PlaylistProps {
    playlists: SimplifiedPlaylistObject[];
}

const Playlist = ({ playlists }: PlaylistProps) => {
    const { id: selectedId } = useParams<{ id: string }>();
    
    const navigate = useNavigate();
    const handleClick = (id: string) => {
        navigate(`/playlist/${id}`);
    }

    return (
        <>
            {playlists.map((playlist) => {
                const imageUrl = playlist.images && playlist.images.length > 0 ? playlist.images[0].url : null;
                const ownerName = playlist.owner.display_name || 'Unknown';
                const isSelected = selectedId === playlist.id;

                return (
                    <PlaylistItem 
                        key={playlist.id} 
                        id={playlist.id} 
                        name={playlist.name} 
                        artistName={ownerName} 
                        imageUrl={imageUrl} 
                        handleClick={handleClick}
                        isSelected={isSelected}
                    />
                );
            })}
        </>
    );
};

export default Playlist;
