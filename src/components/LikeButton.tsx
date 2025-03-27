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
    checkIfLiked();

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

  const checkIfLiked = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      const { data } = await supabase
        .from('likes')
        .select('ip_addresses')
        .eq('id', 1)
        .single();
      
      setHasLiked(data?.ip_addresses?.includes(ip) || false);
    } catch (error) {
      console.error('Error checking IP:', error);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    setIsLoading(true);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      const { data, error } = await supabase
        .rpc('increment_likes', { user_ip: ip });

      if (error) throw error;
      
      if (data) {
        setHasLiked(true);
        toast.success('Thanks for the love! ❤️');
      } else {
        toast.error('You\'ve already liked this!');
      }
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
          "hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950",
          "active:scale-95",
          hasLiked && "text-red-500",
          isLoading && "cursor-not-allowed opacity-70"
        )}
        onClick={handleLike}
        disabled={isLoading || hasLiked}
      >
        <Heart 
          className={cn(
            "w-5 h-5 transition-all duration-300",
            "hover:scale-110",
            hasLiked && "fill-red-500 scale-110"
          )}
        />
        <span 
          className={cn(
            "absolute inset-0 bg-red-50/50 dark:bg-red-950/50",
            "transform transition-transform duration-300",
            isLoading ? "translate-y-0" : "translate-y-full"
          )}
        />
      </Button>
      <p 
        className={cn(
          "text-sm text-muted-foreground transition-all duration-300",
          hasLiked && "text-red-500"
        )}
      >
       <b> {getLikeText(likes, hasLiked)} </b>
      </p>
    </div>
  );
};