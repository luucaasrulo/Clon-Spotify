import {type Song} from "@/lib/data"
import {TimeIcon} from "@/icons/MusicsTableIcons"
import {MusicsTablePlay} from "@/components/MusicsTablePlay"
import {usePlayerStore} from "../store/playerStore";

interface Props {
  songs: Song[]
}


const isCurrentSong = (song: Song) => {
  const {song: currentSong, playlist} = usePlayerStore(state => state.currentMusic)
  return currentSong?.id == song.id && playlist?.albumId == song.albumId
}


export const MusicsTable = ({songs}: Props) => {
  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead className="">
      <tr className="text-zinc-300 text-sm">
        <th className="px-4 py-2 text-lg font-medium">#</th>
        <th className=" py-2 font-light">Título</th>
        <th className="px-4 py-2 font-light">Álbum</th>
        <th className="px-4 py-2 font-light"><TimeIcon /></th>
      </tr>
      </thead>

      <tbody>
      <tr className="h-[16px]"></tr>
      {
        songs.map((song, index) => {
            const isCurrentSongBoolean = isCurrentSong(song)
            return (
              <tr
                key={`{song.albumId}-${song.id}`} className="text-gray-300 border-spacing-0 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 group">
                <td className="relative px-4 py-2 rounded-tl-sm rounded-bl-sm w-5">
                  <span className="text-base absolute top-3 opacity-100 transition-all group-hover:opacity-0">{index + 1}</span>
                  <div className="absolute text-base top-3 opacity-0 transition-all group-hover:opacity-100">
                    <MusicsTablePlay song={song} isCurrentSong={isCurrentSongBoolean}/>
                  </div>
                </td>
                <td className=" py-[2px] flex gap-2">
                  <picture className=" mt-1">
                    <img src={song.image} alt={song.title} className="rounded-[5%] w-[40px] h-[40px]"/>
                  </picture>
                  <div className="flex flex-col">
                    <h3 className={
                        ` font-[500] text-base text-white
                        ${isCurrentSongBoolean ? "text-green-400" : "text-White"}
                        `
                      }>{song.title}</h3>
                    <span>{song.artists.join(", ")}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{song.album}</td>
                <td className="px-4 py-2 rounded-tr-sm rounded-br-sm">{song.duration}</td>
              </tr>
            )
          }
        )
      }
      </tbody>
    </table>
  );
}