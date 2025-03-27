import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const getLikeText = (count: number, hasLiked: boolean) => {
  if (hasLiked) return "Thanks for the love!";
  if (count === 0) return "Be the first to like!";
  if (count === 1) return "1 awesome person liked this";
  return `${count} awesome people liked this`;
};

export const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetchLikes();

    const subscription = supabase
      .channel('likes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'likes' },
        (payload: any) => {
          setLikes(payload.new.count);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchLikes = async () => {
    const { data, error } = await supabase
      .from('likes')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('Error fetching likes:', error);
      return;
    }

    setLikes(data.count);
  };

  const handleLike = async () => {
    if (hasLiked) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.rpc('increment_likes');
      
      if (error) throw error;
      setHasLiked(true);
      toast.success('Thanks for the love! ❤️');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full relative overflow-hidden transition-all duration-300",
          "hover:bg-pink-50 hover:text-pink-500 dark:hover:bg-pink-950",
          "active:scale-95",
          hasLiked && "text-pink-500",
          isLoading && "cursor-not-allowed opacity-70"
        )}
        onClick={handleLike}
        disabled={isLoading || hasLiked}
      >
        <Heart 
          className={cn(
            "w-5 h-5 transition-all duration-300",
            "hover:scale-110",
            hasLiked && "fill-pink-500 scale-110"
          )}
        />
        <span 
          className={cn(
            "absolute inset-0 bg-pink-50/50 dark:bg-pink-950/50",
            "transform transition-transform duration-300",
            isLoading ? "translate-y-0" : "translate-y-full"
          )}
        />
      </Button>
      <p 
        className={cn(
          "text-sm text-muted-foreground transition-all duration-300",
          hasLiked && "text-pink-500"
        )}
      >
       <b> {getLikeText(likes, hasLiked)} </b>
      </p>
    </div>
  );
};